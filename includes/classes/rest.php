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
     * Add REST endpoints.
     *
     * @date    26/10/2021
     * @since   1.0.12
     */
    function registerEndpoints()
    {
        add_action("rest_api_init", function () {
            register_rest_route(
                "streamline/v1",
                "/sites/(?P<search>[a-zA-Z0-9-]+)",
                [
                    "methods" => "GET",
                    "callback" => [$this, "sites"],
                    "permission_callback" => function () {
                        return Init::isAllowed();
                    },
                ]
            );
            register_rest_route(
                "streamline/v1",
                "/posts/(?P<search>[a-zA-Z0-9-]+)",
                [
                    "methods" => "GET",
                    "callback" => [$this, "posts"],
                    "permission_callback" => function () {
                        return Init::isAllowed();
                    },
                ]
            );
        });
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
            "search" => $data["search"],
        ]);

        $index = -1;
        foreach ($arr as $site) {
            $id = $site->blog_id;
            $index++;
            switch_to_blog($id);
            $arr[$index]->siteId = $id;
            $arr[$index]->adminUrl = get_admin_url();
            $arr[$index]->path = get_site($id)->path;
            restore_current_blog();
        }

        $get["children"] = $arr;

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
        $arr = get_posts([
            "s" => $data["search"],
            "post_type" => "any",
        ]);

        if (is_multisite() && function_exists("get_site")) {
            $path = get_site(get_current_blog_id())->path;
        } else {
            $path = "/";
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
        }

        $newArr = [];
        foreach ($arr as $post) {
            $newArr[$post->ID] = $post;
        }

        $get["children"] = $newArr;
        $get["path"] = $path;
        $get["isMultisite"] = is_multisite();

        return $get;
    }

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
}
