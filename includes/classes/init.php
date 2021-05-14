<?php

namespace Streamline;

/**
 * Init class.
 *
 * @date    03/05/2021
 * @since   1.0.0
 */
class Init {

	public function script() {

		global $post;

		$localizeArray = [
			'ajax'   => admin_url( 'admin-ajax.php' ),
			'postId' => $post->ID,
		];

		wp_enqueue_script(
			'streamline',
			plugins_url( '../assets/build/streamline.esm.js', dirname( __FILE__ ) ),
			[],
			filemtime( STREAMLINE_DIR . '/assets/build/streamline.esm.js' ),
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

		add_action( 'admin_enqueue_scripts', [ $this, 'script' ] );

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

		$str = file_get_contents( STREAMLINE_DIR . '/assets/build/streamline.min.css' );

		add_action( 'wp_head', function () use ( &$str ) {

			echo '<style id="streamline-css">' . $str . '</style>';

		} );

		add_action( 'admin_head', function () use ( &$str ) {

			echo '<style id="streamline-css">' . $str . '</style>';

		} );

	}

	/**
	 * Add container.
	 *
	 * @date    04/05/2021
	 * @since   1.0.0
	 */
	private static function addContainer() {

		add_action( 'admin_footer', function () {
			echo '<streamline-container></streamline-container>';
		} );

	}

	/**
	 * Get data.
	 *
	 * @date    04/05/2021
	 * @since   1.0.0
	 */
	private static function getData() {

		add_action( 'admin_footer', function () {
			global $menu;
			global $submenu;

			echo '<script id="streamline-data">';
			echo 'window.streamlineMenu = ' . json_encode( $menu ) . ';';
			echo 'window.streamlineSubmenu = ' . json_encode( $submenu ) . ';';
			echo '</script>';
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
		self::addContainer();
		self::getData();
	}

}

