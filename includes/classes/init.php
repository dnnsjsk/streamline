<?php

namespace Streamline;

/**
 * Init class.
 *
 * @date    03/05/2021
 * @since   1.0.0
 */
class Init {

	function getScript() {

		$localizeArray = [
			'ajax'  => admin_url( 'admin-ajax.php' ),
			'nonce' => wp_create_nonce( 'ajax-nonce' )
		];

		wp_enqueue_script(
			'streamline',
			plugins_url( '../assets/components/build/streamline.esm.js', dirname( __FILE__ ) ),
			[],
			filemtime( STREAMLINE_DIR . '/assets/components/build/streamline.esm.js' ),
			TRUE );

		wp_localize_script( 'streamline', 'streamline', $localizeArray );

	}

	/**
	 * Enqueue scripts.
	 *
	 * @date    03/05/2021
	 * @since   1.0.0
	 */
	private function enqueueScripts() {

		add_action( 'admin_enqueue_scripts', [ $this, 'getScript' ] );
		add_action( 'wp_enqueue_scripts', [ $this, 'getScript' ] );

	}

	/**
	 * Add correct script tags.
	 *
	 * @date    28/07/2020
	 * @since   1.0.0
	 */
	private function addScriptTags() {

		add_filter( 'script_loader_tag', function ( $tag, $handle, $source ) {

			if ( 'streamline' === $handle ) {
				$tag = '<script type="module" id="streamline-js" src="' . $source . '"></script>';
			}

			return $tag;
		}, 10, 3 );

	}

	/**
	 * Inline CSS.
	 *
	 * @date    13/05/2021
	 * @since   1.0.0
	 */
	public static function addCss() {

		$str = file_get_contents( STREAMLINE_DIR . '/assets/components/build/streamline.css' );

		add_action( 'wp_head', function () use ( &$str ) {
			echo '<style id="streamline-css">' . $str . '</style>';
		} );

		add_action( 'admin_head', function () use ( &$str ) {

			echo '<style id="streamline-css">' . $str . '</style>';

		} );

	}

	/**
	 * Get data
	 *
	 * @date    04/05/2021
	 * @since   1.0.0
	 */
	function getData() {

		$currentSite = get_sites( [ 'ID' => get_current_blog_id() ] );

		echo '<script id="streamline-data">';
		echo 'window.streamlineData =';
		echo json_encode( [
			'adminUrl'    => admin_url(),
			'isMultisite' => is_multisite(),
			'path'        => $currentSite[0]->path,
			'siteId'      => get_current_blog_id(),
		] );
		echo '</script>';

	}

	/**
	 * Inject data.
	 *
	 * @date    04/05/2021
	 * @since   1.0.0
	 */
	private function injectData() {

		add_action( 'admin_footer', [ $this, 'getData' ] );
		add_action( 'wp_head', [ $this, 'getData' ] );

	}

	/**
	 * Add container.
	 *
	 * @date    04/05/2021
	 * @since   1.0.0
	 */
	private static function addContainer() {
		$container = '<streamline-container></streamline-container>';

		add_action( 'admin_footer', function () use ( $container ) {
			if ( is_user_logged_in() ) {
				echo $container;
			}
		} );
		add_action( 'wp_footer', function () use ( $container ) {
			if ( is_user_logged_in() ) {
				echo $container;
			}
		} );

	}

	/**
	 * Construct.
	 *
	 * @date    03/05/2021
	 * @since   1.0.0
	 */
	public function __construct() {
		self::enqueueScripts();
		self::addScriptTags();
		self::addCss();
		self::injectData();
		self::addContainer();
	}

}

