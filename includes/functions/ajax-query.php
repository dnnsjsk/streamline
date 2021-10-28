<?php

/**
 * Query handler
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

        delete_user_meta($userId, "streamline_" . $type);
        update_user_meta($userId, "streamline_" . $type, $arr);

        wp_send_json_success("success");
    }
    die();
}

/**
 * Menu handler
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

add_action("plugins_loaded", function () {
    add_action("wp_ajax_streamlineQuery", "streamlineQuery");
    add_action("wp_ajax_streamlineMenu", "streamlineMenu");
});
