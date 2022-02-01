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
        $args = [
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
        add_action("rest_api_init", function () use ($args) {
            register_rest_route("streamline/v1", "/sites", [
                "methods" => "GET",
                "callback" => [$this, "sites"],
                "permission_callback" => function () {
                    return Init::isAllowed();
                },
                "args" => $args,
            ]);
            register_rest_route("streamline/v1", "/posts", [
                "methods" => "GET",
                "callback" => [$this, "posts"],
                "permission_callback" => function () {
                    return Init::isAllowed();
                },
                "args" => $args,
            ]);
        });
    }

    /**
     * Update latest searches.
     *
     * @date    04/01/2022
     * @since   1.0.25
     */
    function updateSearches($userId, $type, $value)
    {
        $key = "streamline_search_history_" . $type;
        $meta = array_slice(get_user_meta($userId, $key, true) ?: [], -50);
        $meta[] = $value;
        delete_user_meta($userId, $key);
        update_user_meta($userId, $key, $meta);
    }

    /**
     * /sites Endpoint.
     *
     * @date    26/10/2021
     * @since   1.0.12
     */
    function sites($data): array
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
        $get["isMultisite"] = is_multisite();

        self::updateSearches($data["userId"], "sites", $data["value"]);

        return $get;
    }

    /**
     * /posts Endpoint.
     *
     * @date    26/10/2021
     * @since   1.0.12
     */
    function posts($data): array
    {
        $args = [
            "s" => $data["value"],
            "post_type" => "any",
            "posts_per_page" => $data["amount"],
            "paged" => $data["page"],
        ];

        $index = -1;
        $newArr = [];

        if (is_multisite() && function_exists("switch_to_blog")) {
            switch_to_blog($data["siteId"]);
        }
        $path = get_site(get_current_blog_id())->path;
        $query = new WP_Query($args);

        foreach ($query->get_posts() as $post) {
            $index++;
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

        self::updateSearches($data["userId"], "posts", $data["value"]);

        return $get;
    }
}
