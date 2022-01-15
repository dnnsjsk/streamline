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
        $meta = get_user_meta($userId, $key, true) ?: [];
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
        ]);

        $index = -1;
        foreach ($arr as $site) {
            $id = $site->blog_id;
            $index++;
            switch_to_blog($id);
            $arr[$index]->name = get_bloginfo("name");
            $arr[$index]->siteId = $id;
            $arr[$index]->adminUrl = get_admin_url();
            $arr[$index]->path = get_site($id)->path;
            restore_current_blog();
        }

        $get["children"] = $arr;

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
        ];

        if (is_multisite() && function_exists("get_site")) {
            switch_to_blog($data["siteId"]);
            $path = get_site(get_current_blog_id())->path;
            $arr = get_posts($args);
            restore_current_blog();
        } else {
            $path = "/";
            $arr = get_posts($args);
        }

        $index = -1;
        foreach ($arr as $post) {
            $index++;
            $arr[$index]->hrefEdit = base64_encode(
                get_edit_post_link($post->ID)
            );
            $arr[$index]->name = $post->post_title;
            $arr[$index]->siteId = get_current_blog_id();
            $arr[$index]->sitePath = $path;
            $arr[$index]->type = "post";
            unset($arr[$index]->post_content);
        }

        $newArr = [];
        foreach ($arr as $post) {
            $newArr[$post->ID] = $post;
        }

        $get["children"] = $newArr;
        $get["path"] = $path;
        $get["isMultisite"] = is_multisite();

        self::updateSearches($data["userId"], "posts", $data["value"]);

        return $get;
    }
}
