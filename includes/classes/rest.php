<?php

namespace Streamline;

use stdClass;
use WP_Query;

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
        $argsGet = [
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
                "value" => [
                    "validate_callback" => function ($param, $request, $key) {
                        return $param;
                    },
                ],
                "amount" => [
                    "validate_callback" => function ($param, $request, $key) {
                        return is_numeric($param);
                    },
                ],
                "page" => [
                    "validate_callback" => function ($param, $request, $key) {
                        return is_numeric($param);
                    },
                ],
            ],
        ];

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

        add_action("rest_api_init", function () use ($argsGet, $argsPost) {
            register_rest_route("streamline/v1", "/get/sites", [
                "methods" => "GET",
                "callback" => [$this, "getSites"],
                "permission_callback" => function () {
                    return Init::isAllowed();
                },
                "args" => $argsGet,
            ]);
            register_rest_route("streamline/v1", "/get/posts", [
                "methods" => "GET",
                "callback" => [$this, "getPosts"],
                "permission_callback" => function () {
                    return Init::isAllowed();
                },
                "args" => $argsGet,
            ]);

            register_rest_route("streamline/v1", "/update/post", [
                "methods" => "POST",
                "callback" => [$this, "updatePost"],
                "permission_callback" => function () {
                    return Init::isAllowed();
                },
                "args" => $argsPost,
            ]);
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
     * /get/sites Endpoint.
     *
     * @date    26/10/2021
     * @since   1.0.12
     */
    function getSites($data): array
    {
        $arr = get_sites([
            "search" => $data["value"],
            "posts_per_page" => 100,
        ]);

        $index = -1;
        $newArr = [];

        foreach ($arr as $site) {
            $obj = new stdClass();
            $id = $site->blog_id;
            $index++;
            switch_to_blog($id);
            $obj->adminUrl = get_admin_url();
            $obj->domain = $site->domain;
            $obj->name = get_bloginfo("name");
            $obj->path = get_site($id)->path;
            $obj->siteId = $id;
            $obj->type = "site";
            $newArr[$index] = $obj;
            restore_current_blog();
        }

        $get["children"] = $newArr;
	    $get["total"] = count($newArr);
        $get["isMultisite"] = is_multisite();

        return $get;
    }

    /**
     * /get/posts Endpoint.
     *
     * @date    26/10/2021
     * @since   1.0.12
     */
    function getPosts($data): array
    {
        $args = [
            "s" => $data["value"],
            "post_type" => "any",
            "posts_per_page" => $data["amount"],
            "paged" => $data["page"],
        ];

        $newArr = [];

        if (is_multisite() && function_exists("switch_to_blog")) {
            switch_to_blog($data["siteId"]);
        }
        $path = get_site(get_current_blog_id())->path;
        $query = new WP_Query($args);

        foreach ($query->get_posts() as $post) {
            $postData = Init::getPostData($post);
            $postData->hrefEdit = base64_encode(get_edit_post_link($post->ID));
            $postData->siteId = $data["siteId"];
            $newArr[$post->ID] = $postData;
        }

        wp_reset_postdata();

        if (is_multisite() && function_exists("restore_current_blog")) {
            restore_current_blog();
        }

        $get["children"] = $newArr;
        $get["isMultisite"] = is_multisite();
        $get["total"] = $query->found_posts;
        $get["path"] = $path;

        return $get;
    }

    /**
     * /update/post Endpoint.
     *
     * @date    04/04/2022
     * @since   1.1.6
     */
    function updatePost($data)
    {
        $values = json_decode(
            stripslashes(html_entity_decode($data["values"]))
        );

        if (is_multisite() && function_exists("switch_to_blog")) {
            switch_to_blog($data["siteId"]);
        }
        wp_update_post([
            "ID" => $data["postId"],
            "post_title" => $values->post_title,
            "post_name" => $values->post_name,
        ]);
        if (is_multisite() && function_exists("restore_current_blog")) {
            restore_current_blog();
        }

        wp_send_json_success();
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
