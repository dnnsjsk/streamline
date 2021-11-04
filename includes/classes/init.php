<?php

namespace Streamline;

/**
 * Init class.
 *
 * @date    03/05/2021
 * @since   1.0.0
 */
class Init
{
    function getScript()
    {
        $localizeArray = [
            "ajax" => admin_url("admin-ajax.php"),
            "rest" => esc_url_raw(rest_url()),
            "nonce" => wp_create_nonce("ajax-nonce"),
            "nonceRest" => wp_create_nonce("wp_rest"),
        ];

        wp_enqueue_script(
            "streamline",
            plugins_url(
                "../assets/components/build/streamline.esm.js",
                dirname(__FILE__)
            ),
            [],
            filemtime(
                STREAMLINE_DIR . "/assets/components/build/streamline.esm.js"
            ),
            true
        );

        wp_localize_script("streamline", "streamline", $localizeArray);
    }

    public static function isAllowed(): bool
    {
        return current_user_can(
            get_option("streamline_settings")->capability ?: "activate_plugins"
        ) &&
            apply_filters("streamline/enable", true) &&
            !defined("OXYGEN_IFRAME");
    }

    /**
     * Enqueue scripts.
     *
     * @date    03/05/2021
     * @since   1.0.0
     */
    private function enqueueScripts()
    {
        add_action("admin_enqueue_scripts", [$this, "getScript"]);
        add_action("wp_enqueue_scripts", [$this, "getScript"]);
    }

    /**
     * Add correct script tags.
     *
     * @date    28/07/2020
     * @since   1.0.0
     */
    private function addScriptTags()
    {
        add_filter(
            "script_loader_tag",
            function ($tag, $handle, $source) {
                if ("streamline" === $handle) {
                    $tag =
                        '<script type="module" id="streamline-js" src="' .
                        $source .
                        '"></script>';
                }

                return $tag;
            },
            10,
            3
        );
    }

    /**
     * Inline CSS.
     *
     * @date    13/05/2021
     * @since   1.0.0
     */
    private function addCss()
    {
        $str = file_get_contents(
            STREAMLINE_DIR . "/assets/components/build/streamline.css"
        );

        add_action("wp_head", function () use (&$str) {
            echo '<style id="streamline-css">' . $str . "</style>";
        });

        add_action("admin_head", function () use (&$str) {
            echo '<style id="streamline-css">' . $str . "</style>";
        });
    }

    /**
     * Get data and rewrite URLs.
     *
     * @date    04/05/2021
     * @since   1.0.0
     */
    function getData()
    {
        $currentSite = "";

        if (is_multisite() && function_exists("get_sites")) {
            $currentSite = get_sites(["ID" => get_current_blog_id()]);
        }

        $favs =
            get_user_meta(get_current_user_id(), "streamline_favourites")[0] ?:
            [];

        $settings =
            get_user_meta(get_current_user_id(), "streamline_settings")[0] ?:
            [];

        foreach ($favs as $fav) {
            if ($fav->type === "menu") {
                $siteId = $fav->siteId;
                $adminUrl = get_admin_url($siteId);
                $fav->adminUrl = $adminUrl;

                foreach ($fav->children as $children) {
                    foreach ($children->children as $link) {
                        $link->adminUrl = $adminUrl;
                        $link->href = $adminUrl . $link->path;
                    }
                }
            }
            if ($fav->type === "networkMenu") {
                $adminUrl = network_admin_url();
                $fav->adminUrl = $adminUrl;

                foreach ($fav->children as $children) {
                    foreach ($children->children as $link) {
                        $link->adminUrl = $adminUrl;
                        $link->href = $adminUrl . $link->path;
                    }
                }
            }
            if ($fav->type === "post") {
                foreach ($fav->children as $post) {
                    if (is_multisite() && function_exists("switch_to_blog")) {
                        switch_to_blog($post->siteId);
                    }
                    $freshPost = get_post($post->ID);
                    foreach ($freshPost as $k => $v) {
                        $post->$k = $v;
                    }
                    $post->hrefEdit = base64_encode(
                        get_edit_post_link($post->ID)
                    );
                    $post->name = $post->post_title;
                    if (
                        is_multisite() &&
                        function_exists("restore_current_blog")
                    ) {
                        restore_current_blog();
                    }
                }
            }
        }

        echo '<script id="streamline-data">';
        echo "window.streamlineData =";
        echo json_encode([
            "adminUrl" => admin_url(),
            "favourites" => json_encode($favs),
            "network" => !is_multisite() ? false : network_admin_url(),
            "isNetwork" => is_network_admin(),
            "isAdmin" => is_admin(),
            "path" => is_multisite() ? $currentSite[0]->path : "/",
            "settings" => json_encode($settings),
            "siteId" => get_current_blog_id(),
            "userId" => get_current_user_id(),
        ]);
        echo ";";
        //echo "console.log(JSON.parse(streamlineData.favourites));";
        echo "</script>";
    }

    /**
     * Inject data.
     *
     * @date    04/05/2021
     * @since   1.0.0
     */
    private function injectData()
    {
        add_action("admin_footer", [$this, "getData"]);
        add_action("wp_head", [$this, "getData"]);
    }

    /**
     * Add container.
     *
     * @date    04/05/2021
     * @since   1.0.0
     */
    private function addContainer()
    {
        $container = "<streamline-container></streamline-container>";

        add_action("admin_footer", function () use ($container) {
            if (self::isAllowed()) {
                echo $container;
            }
        });
        add_action("wp_footer", function () use ($container) {
            if (self::isAllowed()) {
                echo $container;
            }
        });
    }

    /**
     * Add admin bar icon.
     *
     * @date    04/11/2021
     * @since   1.0.18
     */
    private function adminBar()
    {
        add_action("admin_head", function () {
            $url = plugin_dir_url(STREAMLINE) . "assets/iconfonts/"; ?>
			<style>
                @font-face {
                    font-family: 'Streamline';
                    src: url('<?php echo $url . "streamline.eot"; ?>');
                    src: url('<?php echo $url .
                        "streamline.eot?#iefix"; ?>') format('embedded-opentype'),
                    url('<?php echo $url .
                        "streamline.woff"; ?>') format('woff'),
                    url('<?php echo $url .
                        "streamline.ttf"; ?>') format('truetype'),
                    url('<?php echo $url .
                        "streamline.svg#Streamline"; ?>') format('svg');
                    font-weight: normal;
                    font-style: normal;
                }

                #wp-admin-bar-streamline {
	                  display: block !important;
                    cursor: pointer !important;
                }

                #wp-admin-bar-streamline * {
                    cursor: pointer !important;
                }

                .streamline-icon:before {
                    display: inline-block;
                    font-family: 'Streamline' !important;
                    font-style: normal;
                    font-weight: normal;
                    line-height: 1;
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                    content: '\0041' !important;
                    position: relative;
                    top: 2px;
                }

                @media screen and (max-width: 782px) {
                    #wp-admin-bar-streamline {
                      display: flex !important;
	                    align-items: center !important;
	                    justify-content: center !important;
                    }

                    #wp-admin-bar-streamline .streamline-icon:before {
	                    font-size: 32px !important;
	                    top: -1px !important;
                    }
                }
			</style>
			<?php
        });

        add_action("admin_bar_menu", function (\WP_Admin_Bar $bar) {
            $bar->add_menu([
                "id" => "streamline",
                "parent" => "top-secondary",
                "title" =>
                    "<span class='ab-icon streamline-icon'></span><span class='ab-label'>Streamline</span>",
                "meta" => [
                    "onclick" =>
                        'document.querySelector("streamline-container").toggle();',
                ],
            ]);
        });
    }

    /**
     * Construct.
     *
     * @date    03/05/2021
     * @since   1.0.0
     */
    function __construct()
    {
        self::enqueueScripts();
        self::addScriptTags();
        self::addCss();
        self::injectData();
        self::addContainer();
        self::adminBar();
    }
}
