<?php

class FabrikatPlugin {

	static $prefix = '';
	static $name = '';
	static $store_url = '';
	static $item_id = NULL;
	static $license_page = '';
	static $file = '';

	static function init( $prefix, $name, $store_url, $item_id, $license_page, $file ) {

		self::$prefix       = $prefix;
		self::$name         = $name;
		self::$store_url    = $store_url;
		self::$item_id      = $item_id;
		self::$license_page = $license_page;
		self::$file         = $file;

    add_action( 'admin_footer', array( __CLASS__, 'footer' ) );
		add_action( 'admin_init', array( __CLASS__, 'updater' ), 0 );
		add_action( 'admin_menu', array( __CLASS__, 'menu' ), 11 );
		add_action( 'admin_init', array( __CLASS__, 'option' ) );
		add_action( 'admin_init', array( __CLASS__, 'activate' ) );
		add_action( 'admin_init', array( __CLASS__, 'deactivate' ) );
		add_action( 'admin_notices', array( __CLASS__, 'notice' ) );
    add_action( 'admin_enqueue_scripts', array( __CLASS__, 'assets' ) );

	}

  /**
	 * Enqueue assets.
	 *
	 * @since 1.0
	 */
  static function footer() {
      echo '<script>var fabrikatPluginUrl = "'. plugins_url( '/', self::$file ) .'"</script>';
  }

  /**
	 * Enqueue assets.
	 *
	 * @since 1.0
	 */
  static function assets() {
    wp_enqueue_script( 'fabrikat-admin', plugins_url( '/', __FILE__ ) . 'assets/fabrikat-admin.js', [ 'wp-api', 'wp-i18n', 'wp-components', 'wp-element' ], get_plugin_data( self::$file )['Version'], TRUE );
    wp_enqueue_style( 'fabrikat-admin', plugins_url( '/', __FILE__ ) . 'assets/fabrikat-admin.css', [ 'wp-components' ] );
  }

	/**
	 * Plugin updater.
	 *
	 * @since 1.0
	 */
	static function updater() {

		$license_key = trim( get_option( self::$prefix . 'license_key' ) );

		$plugin_data    = get_plugin_data( self::$file );
		$plugin_version = $plugin_data['Version'];

		new EDD_SL_Plugin_Updater( self::$store_url, self::$file,
			array(
				'version' => $plugin_version,
				'license' => $license_key,
				'item_id' => self::$item_id,
				'author'  => 'Fabrikat',
				'url'     => home_url(),
				'beta'    => FALSE,
			)
		);

	}

	/**
	 * License menu.
	 *
	 * @since 1.0
	 */
	static function menu() {
		add_submenu_page(
			'tools.php',
			self::$name,
			self::$name,
			'manage_options',
			self::$license_page,
			array(
				__CLASS__,
				'page'
			) );
	}

	/**
	 * License page.
	 *
	 * @since 1.0
	 */
	static function page() {
		$license = get_option( self::$prefix . 'license_key' );
		$status  = get_option( self::$prefix . 'license_status' );
		?>
        <div id="fabrikat-plugin">
		<?php
	}

	/**
	 * License option.
	 *
	 * @since 1.0
	 */
	static function option() {
		register_setting( self::$prefix . 'license', self::$prefix . 'license_key', array( __CLASS__, 'sanitize' ) );
	}

	/**
	 * Sanitize license.
	 *
	 * @since 1.0
	 */
	function sanitize( $new ) {
		$old = get_option( self::$prefix . 'license_key' );
		if ( $old && $old != $new ) {
			delete_option( self::$prefix . 'license_status' );
		}

		return $new;
	}

	/**
	 * Activate license.
	 *
	 * @since 1.0
	 */
	static function activate() {

		// listen for our activate button to be clicked
		if ( isset( $_POST[ self::$prefix . 'license_activate' ] ) ) {
			ob_start();
			// run a quick security check
			if ( ! check_admin_referer( self::$prefix . 'nonce', self::$prefix . 'nonce' ) ) {
				return;
			}

			// retrieve the license from the database
			// $license = trim( get_option( 'spx_license_key' ) );
			$license = $_POST[ self::$prefix . 'license_key' ] ? sanitize_text_field( $_POST[ self::$prefix . 'license_key' ] ) : FALSE;

			update_option( self::$prefix . 'license_key', $license );

			// data to send in our API request
			$api_params = array(
				'edd_action' => 'activate_license',
				'license'    => $license,
				'item_name'  => urlencode( self::$name ), // the name of our product in EDD
				'url'        => home_url()
			);

			// Call the custom API.
			$response = wp_remote_post( self::$store_url, array(
				'timeout'   => 15,
				'sslverify' => FALSE,
				'body'      => $api_params
			) );

			// make sure the response came back okay
			if ( is_wp_error( $response ) || 200 !== wp_remote_retrieve_response_code( $response ) ) {

				if ( is_wp_error( $response ) ) {
					$message = $response->get_error_message();
				} else {
					$message = __( 'An error occurred, please try again.' );
				}

			} else {

				$license_data = json_decode( wp_remote_retrieve_body( $response ) );

				if ( FALSE === $license_data->success ) {

					switch ( $license_data->error ) {

						case 'expired' :

							$message = sprintf(
								__( 'Your license key expired on %s.' ),
								date_i18n( get_option( 'date_format' ), strtotime( $license_data->expires, current_time( 'timestamp' ) ) )
							);
							break;

						case 'disabled' :
						case 'revoked' :

							$message = __( 'Your license key has been disabled.' );
							break;

						case 'missing' :

							$message = __( 'Invalid license.' );
							break;

						case 'invalid' :
						case 'site_inactive' :

							$message = __( 'Your license is not active for this URL.' );
							break;

						case 'item_name_mismatch' :

							$message = sprintf( __( 'This appears to be an invalid license key for %s.' ), self::$name );
							break;

						case 'no_activations_left':

							$message = __( 'Your license key has reached its activation limit.' );
							break;

						default :

							$message = __( 'An error occurred, please try again.' );
							break;
					}

				}

			}

			// Check if anything passed on a message constituting a failure
			if ( ! empty( $message ) ) {
				$base_url = admin_url( 'tools.php?page=' . self::$license_page );
				$redirect = add_query_arg( array(
					'sl_activation' => 'false',
					'message'       => urlencode( $message )
				), $base_url );

				wp_redirect( $redirect );
				exit();
			}

			// $license_data->license will be either "valid" or "invalid"
			update_option( self::$prefix . 'license_status', $license_data->license );
			wp_redirect( admin_url( 'tools.php?page=' . self::$license_page ) );
			exit();
		}
	}

	/**
	 * Deactivate license.
	 *
	 * @since 1.0
	 */
	static function deactivate() {

		// listen for our activate button to be clicked
		if ( isset( $_POST[ self::$prefix . 'license_deactivate' ] ) ) {
			ob_start();
			// run a quick security check
			if ( ! check_admin_referer( self::$prefix . 'nonce', self::$prefix . 'nonce' ) ) {
				return;
			} // get out if we didn't click the Activate button

			// retrieve the license from the database
			$license = trim( get_option( self::$prefix . 'license_key' ) );
			$license = $_POST[ self::$prefix . 'license_key' ] && strlen( $_POST[ self::$prefix . 'license_key' ] ) > 8 ? sanitize_text_field( $_POST[ self::$prefix . 'license_key' ] ) : $license;

			// data to send in our API request
			$api_params = array(
				'edd_action' => 'deactivate_license',
				'license'    => $license,
				'item_id'    => self::$item_id,
				'item_name'  => urlencode( self::$name ), // the name of our product in EDD
				'url'        => home_url()
			);

			// Call the custom API.
			$response = wp_remote_post( self::$store_url, array(
				'timeout'   => 15,
				'sslverify' => FALSE,
				'body'      => $api_params
			) );

			// make sure the response came back okay
			if ( is_wp_error( $response ) || 200 !== wp_remote_retrieve_response_code( $response ) ) {

				if ( is_wp_error( $response ) ) {
					$message = $response->get_error_message();
				} else {
					$message = __( 'An error occurred, please try again.' );
				}

				$base_url = admin_url( 'tools.php?page=' . self::$license_page );
				$redirect = add_query_arg( array(
					'sl_activation' => 'false',
					'message'       => urlencode( $message )
				), $base_url );

				wp_redirect( $redirect );
				exit();
			}

			// decode the license data
			// $license_data = json_decode( wp_remote_retrieve_body( $response ) );

			// $license_data->license will be either "deactivated" or "failed"
			// if( $license_data->license == 'deactivated' ) {
			//	delete_option( 'spx_license_status' );
			// }

			delete_option( self::$prefix . 'license_status' );
			delete_option( self::$prefix . 'license_key' );

			wp_redirect( admin_url( 'tools.php?page=' . self::$license_page ) );
			exit();

		}
	}

	/**
	 * Check license.
	 *
	 * @since 1.0
	 */
	static function check() {

		global $wp_version;

		$license = trim( get_option( self::$prefix . 'license_key' ) );

		$api_params = array(
			'edd_action' => 'check_license',
			'license'    => $license,
			'item_name'  => urlencode( self::$name ),
			'url'        => home_url()
		);

		// Call the custom API.
		$response = wp_remote_post( self::$store_url, array(
			'timeout'   => 15,
			'sslverify' => FALSE,
			'body'      => $api_params
		) );

		if ( is_wp_error( $response ) ) {
			return FALSE;
		}

		$license_data = json_decode( wp_remote_retrieve_body( $response ) );

		if ( $license_data->license == 'valid' ) {
			echo 'valid';
			exit;
			// this license is still valid
		} else {
			echo 'invalid';
			exit;
			// this license is no longer valid
		}
	}

	/**
	 * Notice.
	 *
	 * @since 1.0
	 */
	static function notice() {
	if ( isset( $_GET['sl_activation'] ) && ! empty( $_GET['message'] ) ) {

		switch( $_GET['sl_activation'] ) {

			case 'false':
				$message = urldecode( $_GET['message'] );
				?>
				<div class="error">
					<p><?php echo $message; ?></p>
				</div>
				<?php
				break;

			case 'true':
			default:
				$message = urldecode( $_GET['message'] );
				?>
				<div class="notice notice-success">
					<p><?php echo $message; ?></p>
				</div>
				<?php
				break;
		    }
	    }
    }

}
