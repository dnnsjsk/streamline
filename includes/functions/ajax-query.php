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
		$get      = '';

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
				restore_current_blog();
			}

			$get = $arr;

			wp_send_json_success( $get );
		}

		if ( $callback === 'get_posts' ) {
			$arr = call_user_func( $callback, [
				's'         => $query,
				'post_type' => 'any'
			] );

			$index = - 1;
			foreach ( $arr as $post ) {
				$index ++;
				$arr[ $index ]->hrefEdit = base64_encode( get_edit_post_link( $post->ID ) );
				$arr[ $index ]->name     = $post->post_title;
				$arr[ $index ]->siteId   = get_current_blog_id();
			}

			$newArr = [];
			foreach ( $arr as $post ) {
				$newArr[ $post->ID ] = $post;
			}

			$get = $newArr;

			wp_send_json_success( $get );
		}

		if ( $callback === 'fav' ) {
			$userMeta               = get_user_meta( $userId, 'streamline' ) ?: [];
			$fav                    = json_decode( stripslashes( html_entity_decode( $query ) ) );
			$userMeta['favourites'] = $fav;

			delete_user_meta( $userId, 'streamline' );
			update_user_meta( $userId, 'streamline', $userMeta );

			wp_send_json_success( 'success' );
		}
	}
	die ();
}

add_action( 'plugins_loaded', function () {
	add_action( 'wp_ajax_streamlineQuery', 'streamlineQuery' );
} );
