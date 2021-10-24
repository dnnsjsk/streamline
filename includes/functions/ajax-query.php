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
		$userId   = intval( $_POST['userId'] );
		$get      = [];

		if ( $callback === 'get_sites' ) {
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
				$arr[ $index ]->path     = get_site( $id )->path;
				restore_current_blog();
			}

			$get['children'] = $arr;

			wp_send_json_success( $get );
		}

		if ( $callback === 'get_posts' ) {
			$arr = call_user_func( $callback, [
				's'         => $query,
				'post_type' => 'any'
			] );

			$path = '';

			if (is_multisite() && function_exists('get_site')) {
				$path = get_site( get_current_blog_id() )->path;
			} else {
				$path = '/';
			}

			$index = - 1;
			foreach ( $arr as $post ) {
				$index ++;
				$arr[ $index ]->hrefEdit = base64_encode( get_edit_post_link( $post->ID ) );
				$arr[ $index ]->name     = $post->post_title;
				$arr[ $index ]->siteId   = get_current_blog_id();
				$arr[ $index ]->sitePath = $path;
			}

			$newArr = [];
			foreach ( $arr as $post ) {
				$newArr[ $post->ID ] = $post;
			}

			$get['children']    = $newArr;
			$get['path']        = $path;
			$get['isMultisite'] = is_multisite();

			wp_send_json_success( $get );
		}

		if ( $callback === 'fav' ) {
			$userMeta               = [];
			$fav                    = json_decode( stripslashes( html_entity_decode( $query ) ) );
			$userMeta['favourites'] = $fav;

			delete_user_meta( $userId, 'streamline' );
			update_user_meta( $userId, 'streamline', $userMeta );

			wp_send_json_success( 'success' );
		}
	}
	die();
}

/**
 * Menu handler
 *
 * @date    21/10/2021
 * @since   1.0.0
 */
function streamlineMenu() {
	if ( wp_verify_nonce( $_POST['nonce'], 'ajax-nonce' ) ) {
		$url = $_POST['url'];

		$response = wp_remote_get( $url, [
			'timeout'   => 15,
			'sslverify' => FALSE
		] );

		$body = wp_remote_retrieve_body( $response );

		wp_send_json( $body );
	}
	die();
}

add_action( 'plugins_loaded', function () {
	add_action( 'wp_ajax_streamlineQuery', 'streamlineQuery' );
	add_action( 'wp_ajax_streamlineMenu', 'streamlineMenu' );
} );
