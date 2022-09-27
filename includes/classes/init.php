<?php

namespace Streamline;

use stdClass;

/**
 * Init class.
 *
 * @date    03/05/2021
 * @since   1.0.0
 */
class Init
{
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

    /**
     * Get JS.
     *
     * @date    03/05/2021
     * @since   1.0.0
     */
    function getScript()
    {
        if (self::isAllowed()) {
            $localizeArray = [
                "ajax" => admin_url("admin-ajax.php"),
                "rest" => esc_url_raw(rest_url()),
                "nonce" => wp_create_nonce("ajax-nonce"),
                "nonceRest" => wp_create_nonce("wp_rest"),
            ];

            wp_enqueue_script(
                "streamline",
                plugins_url(
                    "../includes/assets/components/build/streamline.esm.js",
                    dirname(__FILE__)
                ),
                [],
                filemtime(
                    STREAMLINE_DIR .
                        "/includes/assets/components/build/streamline.esm.js"
                ),
                true
            );

            wp_localize_script("streamline", "streamline", $localizeArray);
        }
    }

    /**
     * Get allowed user role.
     *
     * @date    03/05/2021
     * @since   1.0.0
     */
    public static function isAllowed(): bool
    {
        return (current_user_can(
            get_option("streamline_settings") &&
            get_option("streamline_settings")->capability
                ? get_option("streamline_settings")->capability
                : "activate_plugins"
        ) &&
            apply_filters("streamline/enable", true) &&
            !defined("OXYGEN_IFRAME")) ||
            defined("STREAMLINE_TEST");
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
            STREAMLINE_DIR . "/includes/assets/components/build/streamline.css"
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

        $favsOption = get_user_meta(
            get_current_user_id(),
            "streamline_favourites"
        );
        $favs = $favsOption[0] ?? [];

        $settingsOption = get_user_meta(
            get_current_user_id(),
            "streamline_settings"
        );
        $settings = $settingsOption[0] ?? [];

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
                    $postData = self::getPostData($freshPost);
                    foreach ($postData as $k => $v) {
                        $post->$k = $v;
                    }
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
            "isAdmin" => is_admin(),
            "isNetwork" => is_network_admin(),
            "network" => !is_multisite() ? false : network_admin_url(),
            "settings" => json_encode($settings),
            "siteId" => strval(get_current_blog_id()),
            "sitePath" => is_multisite() ? $currentSite[0]->path : "/",
            "siteUrl" => get_site_url(),
            "userId" => strval(get_current_user_id()),
        ]);
        echo ";";
        // echo "console.log(JSON.parse(streamlineData.favourites));";
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
            $url = plugin_dir_url(STREAMLINE) . "includes/assets/iconfonts/"; ?>
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
      <script>
          function streamlineResetSettings() {
            fetch(window.streamline.rest + 'streamline/v1/reset/settings?userId=' + <?php echo get_current_user_id(); ?>, {
              method: 'POST',
              credentials: 'same-origin',
              headers: {
                // @ts-ignore
                // eslint-disable-next-line no-undef
                'X-WP-Nonce': window.streamline.nonceRest,
                'Content-Type': 'application/json',
              },
            })
              .then((response) => response && response.json())
              .then((data) => {
                const el = document.querySelector('#wp-admin-bar-streamline-reset a');

                if (data.success) {
                 el.innerHTML = 'Settings were reset!';
                 window.location.reload();
                }
              })
          }
      </script>
			<?php
        });

        add_action("admin_bar_menu", function (\WP_Admin_Bar $bar) {
            $bar->add_menu([
                "id" => "streamline",
                "parent" => "top-secondary",
                "href" => "#0",
                "title" =>
                    "<span class='ab-icon streamline-icon'></span><span class='ab-label'>Streamline</span>",
                "meta" => [
                    "onclick" =>
                        'document.querySelector("streamline-container").toggle();',
                ],
            ]);
            $bar->add_menu([
                "id" => "streamline-reset",
                "parent" => "streamline",
                "href" => "#0",
                "title" => "Reset settings",
                "meta" => [
                    "onclick" => "streamlineResetSettings();",
                ],
            ]);
        });
    }

    /**
     * Get post data.
     *
     * @date    15/01/2021
     * @since   1.1.0
     */
    public static function getPostData($post): stdClass
    {
        $obj = new stdClass();
        $obj->ID = strval($post->ID);
        $obj->guid = $post->guid;
        $obj->post_name = $post->post_name;
        $obj->post_type = $post->post_type;
        $obj->post_title = $post->post_title;
        $obj->post_status = $post->post_status;
        $obj->name = $post->post_title;
        $obj->type = "post";

        return $obj;
    }
}

new Init();
