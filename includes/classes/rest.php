<?php

namespace Streamline;

/**
 * Rest class.
 *
 * @date    26/10/2021
 * @since   1.0.12
 */
class Rest
{
    /**
     * Construct.
     *
     * @date    26/10/2021
     * @since   1.0.12
     */
    function __construct()
    {
        self::registerEndpoints();
    }

    /**
     * Add REST endpoints.
     *
     * @date    26/10/2021
     * @since   1.0.12
     */
    function registerEndpoints()
    {
        $argsPost = [
            "args" => [
                "siteId" => [
                    "validate_callback" => function ($param, $request, $key) {
                        return is_numeric($param);
                    },
                ],
                "userId" => [
                    "validate_callback" => function ($param, $request, $key) {
                        return is_numeric($param);
                    },
                ],
                "values" => [
                    "validate_callback" => function ($param, $request, $key) {
                        return $param;
                    },
                ],
            ],
        ];

        add_action("rest_api_init", function () use ($argsPost) {
            register_rest_route("streamline/v1", "/update/settings", [
                "methods" => "POST",
                "callback" => [$this, "updateSettings"],
                "permission_callback" => function () {
                    return Init::isAllowed();
                },
                "args" => $argsPost,
            ]);

            register_rest_route("streamline/v1", "/reset/settings", [
                "methods" => "POST",
                "callback" => [$this, "resetSettings"],
                "permission_callback" => function () {
                    return Init::isAllowed();
                },
                "args" => $argsPost,
            ]);
        });
    }

    /**
     * /update/settings Endpoint.
     *
     * @date    04/04/2022
     * @since   1.1.6
     */
    function updateSettings($data)
    {
        $values = json_decode(
            stripslashes(html_entity_decode($data["values"]))
        );

        delete_user_meta($data["userId"], "streamline_" . $data["type"]);
        update_user_meta(
            $data["userId"],
            "streamline_" . $data["type"],
            $values
        );

        wp_send_json_success();
    }

    /**
     * /reset/settings Endpoint.
     *
     * @date    04/04/2022
     * @since   1.1.6
     */
    function resetSettings($data)
    {
        $id = $data["userId"];

        delete_user_meta($id, "streamline_favourites");
        delete_user_meta($id, "streamline_settings");
        delete_user_meta($id, "streamline_search_history_sites");
        delete_user_meta($id, "streamline_search_history_posts");

        wp_send_json_success();
    }
}

new Rest();
