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

		add_action( 'admin_enqueue_scripts', [ __CLASS__, 'assets' ] );
		add_action( 'admin_init', [ __CLASS__, 'updater' ], 0 );
		add_action( 'admin_init', [ __CLASS__, 'option' ] );
		add_action( 'admin_menu', [ __CLASS__, 'menu' ], 11 );

		add_action( 'plugins_loaded', function () {
			add_action( 'wp_ajax_fabrikatAdminQuery', [ __CLASS__, 'fabrikatAdminQuery' ] );
		} );
	}

	/**
	 * Enqueue assets.
	 *
	 * @since 1.0
	 */
	static function assets() {
		$localizeArray = [
			'ajax'  => admin_url( 'admin-ajax.php' ),
			'nonce' => wp_create_nonce( 'ajax-nonce' )
		];

		wp_enqueue_script( 'fabrikat-admin', plugins_url( '/', __FILE__ ) . 'assets/fabrikat-admin.js', [
			'wp-api',
			'wp-i18n',
			'wp-components',
			'wp-element'
		], get_plugin_data( self::$file )['Version'], TRUE );
		wp_enqueue_style( 'fabrikat-admin', plugins_url( '/', __FILE__ ) . 'assets/fabrikat-admin.css', [ 'wp-components' ] );
		wp_localize_script( 'fabrikat-admin', 'fabrikatAdmin', $localizeArray );
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
		?>
      <script>
        var fabrikatPlugin = {
          pluginUrl: '<?php echo plugins_url( '/', self::$file ); ?>',
          shopUrl: '<?php echo self::$store_url; ?>',
          productId: '<?php echo self::$item_id; ?>',
          currentUrl: '<?php echo home_url(); ?>',
          licenseStatus: '<?php echo get_option( self::$prefix . 'license_status' ); ?>',
          licenseCode: '<?php echo trim( get_option( self::$prefix . 'license_key' ) ); ?>'
        };
      </script>
      <div id="fabrikat-plugin"></div>
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
	 * AJAX query.
	 *
	 * @since 1.0
	 */
	static function fabrikatAdminQuery() {
		if ( wp_verify_nonce( $_POST['nonce'], 'ajax-nonce' ) ) {
			$license = $_POST['license'] ? sanitize_text_field( $_POST['license'] ) : FALSE;
			$action  = $_POST['type'];

			$api_params = array(
				'edd_action' => $action,
				'license'    => $license,
				'item_name'  => urlencode( self::$name ),
				'url'        => home_url()
			);

			$response = wp_remote_post( self::$store_url, array(
				'timeout'   => 15,
				'sslverify' => FALSE,
				'body'      => $api_params
			) );

			$body         = wp_remote_retrieve_body( $response );
			$license_data = json_decode( $body );

			if ( ! is_wp_error( $response ) || 200 === wp_remote_retrieve_response_code( $response ) ) {
				if ( $action === 'activate_license' && $license_data->license === 'valid' ) {
					update_option( self::$prefix . 'license_status', $license_data->license );
					update_option( self::$prefix . 'license_key', $license );
				} else if ( $action === 'deactivate_license' || $license_data->license === 'invalid' ) {
					delete_option( self::$prefix . 'license_status' );
					delete_option( self::$prefix . 'license_key' );
				}
			}

			wp_send_json( $license_data );

			die();
		}
	}
}
