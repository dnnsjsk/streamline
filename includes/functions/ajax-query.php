<?php

/**
 * Query handler.
 *
 * @date    08/10/2021
 * @since   1.0.0
 */
function streamlineQuery()
{
    if (wp_verify_nonce($_POST["nonce"], "ajax-nonce")) {
        $type = $_POST["type"];
        $query = $_POST["query"];
        $userId = intval($_POST["userId"]);
        $arr = json_decode(stripslashes(html_entity_decode($query)));

        if ($type !== "post") {
            delete_user_meta($userId, "streamline_" . $type);
            update_user_meta($userId, "streamline_" . $type, $arr);
        } else {
            if (is_multisite() && function_exists("switch_to_blog")) {
                switch_to_blog($arr->siteId);
            }
            wp_update_post([
                "ID" => $arr->postId,
                "post_title" => $arr->values->post_title,
                "post_name" => $arr->values->post_name,
            ]);
            if (is_multisite() && function_exists("restore_current_blog")) {
                restore_current_blog();
            }
        }
        wp_send_json_success("success");
    }
    die();
}

/**
 * Menu handler.
 *
 * @date    21/10/2021
 * @since   1.0.0
 */
function streamlineMenu()
{
    if (wp_verify_nonce($_POST["nonce"], "ajax-nonce")) {
        $url = $_POST["url"];

        $response = wp_remote_get($url, [
            "timeout" => 15,
            "sslverify" => false,
        ]);

        $body = wp_remote_retrieve_body($response);

        wp_send_json($body);
    }
    die();
}

/**
 * Reset settings.
 *
 * @date    08/02/2022
 * @since   1.1.4
 */
function streamlineReset()
{
    if (wp_verify_nonce($_POST["nonce"], "ajax-nonce")) {
        $id = wp_get_current_user()->ID;

        delete_user_meta($id, "streamline_favourites");
        delete_user_meta($id, "streamline_settings");
        delete_user_meta($id, "streamline_search_history_sites");
        delete_user_meta($id, "streamline_search_history_posts");

		wp_send_json_success();
    }
    die();
}

add_action("plugins_loaded", function () {
    add_action("wp_ajax_streamlineQuery", "streamlineQuery");
    add_action("wp_ajax_streamlineMenu", "streamlineMenu");
    add_action("wp_ajax_streamlineReset", "streamlineReset");
});
