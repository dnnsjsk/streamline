<?php

/**
 * Init class.
 *
 * @date    03/05/2021
 * @since   1.0.0
 */

namespace Streamline;

class Init {

	public function script() {

		global $post;

		$asset = include( STREAMLINE_DIR . '/assets/streamline.asset.php' );

		$localizeArray = [
			'ajax'   => admin_url( 'admin-ajax.php' ),
			'postId' => $post->ID,
		];

		wp_enqueue_script(
			'streamline',
			plugins_url( '../assets/streamline.js', dirname( __FILE__ ) ),
			$asset['dependencies'],
			$asset['version'],
			TRUE );

		wp_enqueue_style(
			'streamline',
			plugins_url( '../assets/streamline.css', dirname( __FILE__ ) ),
			[],
			filemtime( STREAMLINE_DIR . '/assets/streamline.css' ) );

		wp_enqueue_style(
			'streamline-components',
			plugins_url( '../../../../wp-includes/css/dist/components/style.min.css', dirname( __FILE__ ) ),
			[],
			filemtime( STREAMLINE_DIR . '/assets/streamline.css' ) );

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
	 * Add container.
	 *
	 * @date    04/05/2021
	 * @since   1.0.0
	 */

	private static function addContainer() {

		add_action( 'admin_footer', function () {
			echo '<div id="streamline"></div>';
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
		self::addContainer();
		self::getData();
	}

}

