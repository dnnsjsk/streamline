<?php

/**
 * Query handler
 *
 * @date    08/10/2021
 * @since   1.0.0
 */
function streamlineQuery() {
	if ( wp_verify_nonce( $_POST['nonce'], 'ajax-nonce' ) ) {
		$callback = $_POST['callback'];
		$query    = $_POST['query'];
		$get      = '';

		if ( $callback == 'get_sites' ) {
			$arr = call_user_func( $callback, [
				'search' => $query
			] );

			$index = - 1;
			foreach ( $arr as $site ) {
				$id = $site->blog_id;
				$index ++;
				switch_to_blog( $id );
				$arr[ $index ]->siteId   = $id;
				$arr[ $index ]->adminUrl = get_admin_url();
				restore_current_blog();
			}

			$get = $arr;
		}

		wp_send_json_success( $get );
	}
	die ();
}

add_action( 'plugins_loaded', function () {
	add_action( 'wp_ajax_streamlineQuery', 'streamlineQuery' );
} );
