<?php

namespace Streamline;

/**
 * JSON class.
 *
 * @date    04/04/2022
 * @since   1.2.0
 */
class JSON
{
    /**
     * Construct.
     *
     * @date    04/04/2022
     * @since   1.2.0
     */
    function __construct()
    {
        self::injectData();
    }

    /**
     * Get data and rewrite URLs.
     *
     * @date    04/04/2022
     * @since   1.2.0
     */
    function getData()
    {
        $theme = is_child_theme()
            ? get_stylesheet_directory()
            : get_template_directory();

        $path =
            apply_filters("streamline/json/path", $theme) .
            DIRECTORY_SEPARATOR .
            "streamline.json";

        if (file_exists($path) && Init::isAllowed()) {
            $data = json_decode(file_get_contents($path), true);
            echo '<script id="streamline-json">';
            echo "window.streamlineJson = ";
            echo json_encode($data);
            echo ";";
            // echo "console.log(JSON.parse(streamlineJson));";
            echo "</script>";
        }
    }

    /**
     * Inject data.
     *
     * @date    04/04/2022
     * @since   1.2.0
     */
    private function injectData()
    {
        add_action("admin_footer", [$this, "getData"]);
        add_action("wp_head", [$this, "getData"]);
    }
}

new JSON();
