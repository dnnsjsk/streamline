<?php
/**
 * 1.1
 * @date 12/04/2023
 */

class StreamlinePlugin
{
    static string $prefix = "";
    static string $name = "";
    static string $store_url = "";
    static ?int $item_id = null;
    static string $license_page = "";
    static string $file = "";

    static function init(
        $prefix,
        $name,
        $store_url,
        $item_id,
        $license_page,
        $file
    ) {
        self::$prefix = $prefix;
        self::$name = $name;
        self::$store_url = $store_url;
        self::$item_id = $item_id;
        self::$license_page = $license_page;
        self::$file = $file;

        $admin = array_key_exists("page", $_GET)
            ? admin_url("admin.php?page=" . $_GET["page"])
            : "";
        $name = str_replace("_", "", $prefix);

        if (
            substr_compare($admin, $license_page, -strlen($license_page)) === 0
        ) {
            add_action("admin_enqueue_scripts", [__CLASS__, "assets"]);
        }
        add_action("admin_init", [__CLASS__, "updater"], 0);
        add_action("admin_init", [__CLASS__, "option"]);
        add_action("admin_init", [__CLASS__, "constant"]);
        add_action("admin_menu", [__CLASS__, "menu"], 11);
        add_action("plugins_loaded", function () use (&$name) {
            add_action("wp_ajax_${name}LicenseQuery", [
                __CLASS__,
                "fabrikatLicenseQuery",
            ]);
            add_action("wp_ajax_${name}SettingsQuery", [
                __CLASS__,
                "fabrikatSettingsQuery",
            ]);
        });
    }

    /**
     * Get status.
     *
     * @since 1.1
     */
    static function getStatus(): string
    {
        return trim(get_option(self::$prefix . "license_status"));
    }

    /**
     * Get key.
     *
     * @since 1.1
     */
    static function getKey(): string
    {
        return trim(get_option(self::$prefix . "license_key"));
    }

    /**
     * Get key const.
     *
     * @since 1.1
     */
    static function getKeyConst(): string
    {
        return trim(get_option(self::$prefix . "license_key_const"));
    }

    /**
     * Get settings.
     *
     * @since 1.1
     */
    static function getSettings(): string
    {
        return get_option(self::$prefix . "settings");
    }

    /**
     * Enqueue assets.
     *
     * @since 1.0
     */
    static function assets()
    {
        $url = str_replace("_", "", self::$prefix);

        $localizeArray = [
            "ajax" => admin_url("admin-ajax.php"),
            "nonce" => wp_create_nonce("ajax-nonce"),
        ];

        wp_enqueue_script(
            "fabrikat-admin",
            plugins_url("/", __FILE__) . "assets/${url}-admin.js",
            ["wp-api", "wp-i18n", "wp-components", "wp-element"],
            get_plugin_data(self::$file)["Version"],
            true
        );
        wp_enqueue_style(
            "fabrikat-admin",
            plugins_url("/", __FILE__) . "assets/fabrikat-admin.css",
            ["wp-components"]
        );
        wp_localize_script("fabrikat-admin", "fabrikatAdmin", $localizeArray);
    }

    /**
     * Plugin updater.
     *
     * @since 1.0
     */
    static function updater()
    {
        $pluginData = get_plugin_data(self::$file);
        $pluginVersion = $pluginData["Version"];

        new EDD_SL_Plugin_Updater(self::$store_url, self::$file, [
            "version" => $pluginVersion,
            "license" => self::getKey(),
            "item_id" => self::$item_id,
            "author" => "Fabrikat",
            "url" => home_url(),
            "beta" => false,
        ]);
    }

    /**
     * License menu.
     *
     * @since 1.0
     */
    static function menu()
    {
        add_submenu_page(
            "tools.php",
            self::$name,
            self::$name,
            "manage_options",
            self::$license_page,
            [__CLASS__, "page"]
        );
    }

    /**
     * License page.
     *
     * @since 1.0
     */
    static function page()
    {
        ?>
      <script>
        var fabrikatPlugin = {
          name: '<?php echo str_replace("_", "", self::$prefix); ?>',
          pluginUrl: '<?php echo plugins_url("/", self::$file); ?>',
          shopUrl: '<?php echo self::$store_url; ?>',
          productId: '<?php echo self::$item_id; ?>',
          currentUrl: '<?php echo home_url(); ?>',
          licenseStatus: '<?php echo self::getStatus(); ?>',
          licenseCode: '<?php echo self::getKey(); ?>',
          settings: '<?php echo json_encode(self::getSettings()); ?>'
        };
      </script>
      <div id="fabrikat-plugin"></div>
		<?php
    }

    /**
     * License option.
     *
     * @since 1.0
     */
    static function option()
    {
        register_setting(
            self::$prefix . "license",
            self::$prefix . "license_key",
            [__CLASS__, "sanitize"]
        );
    }

    /**
     * Sanitize license.
     *
     * @since 1.0
     */
    static function sanitize($new)
    {
        $old = self::getKey();
        if ($old && $old != $new) {
            delete_option(self::$prefix . "license_status");
        }

        return $new;
    }

    /**
     * Check license.
     *
     * @since 1.1
     */
    static function checkLicense($license, $action)
    {
        $api_params = [
            "edd_action" => $action,
            "license" => $license,
            "item_name" => urlencode(self::$name),
            "url" => home_url(),
        ];

        $response = wp_remote_post(self::$store_url, [
            "timeout" => 15,
            "sslverify" => false,
            "body" => $api_params,
        ]);

        $body = wp_remote_retrieve_body($response);
        $licenseData = json_decode($body);

        if (
            !is_wp_error($response) ||
            200 === wp_remote_retrieve_response_code($response)
        ) {
            if (
                $action === "activate_license" &&
                $licenseData->license === "valid"
            ) {
                update_option(
                    self::$prefix . "license_status",
                    $licenseData->license
                );
                update_option(self::$prefix . "license_key", $license);
            } elseif (
                $action === "deactivate_license" ||
                $licenseData->license === "invalid"
            ) {
                update_option(
                    self::$prefix . "license_status",
                    $licenseData->license
                );
                delete_option(self::$prefix . "license_key");
            }
        }

        return $licenseData;
    }

    static function constant()
    {
        $var = strtoupper(self::$prefix . "license");
        $const = defined($var) ? constant($var) : false;

        if (
            !$const ||
            !defined($var) ||
            empty(constant($var)) ||
            !is_string(constant($var))
        ) {
            return;
        }

        if ($const !== self::getKey()) {
            if (self::getStatus() === "valid") {
                self::checkLicense(self::getKey(), "deactivate_license");
            }
            if (
                ($const !== self::getKeyConst() &&
                    self::getStatus() !== "valid") ||
                ($const === self::getKeyConst() &&
                    self::getStatus() !== "invalid")
            ) {
                update_option(self::$prefix . "license_key_const", $const);
                self::checkLicense($const, "activate_license");
            }
        }
    }

    /**
     * License query.
     *
     * @since 1.0
     */
    static function fabrikatLicenseQuery()
    {
        if (wp_verify_nonce($_POST["nonce"], "ajax-nonce")) {
            $license = $_POST["license"]
                ? sanitize_text_field($_POST["license"])
                : false;
            $action = $_POST["type"];

            $licenseData = self::checkLicense($license, $action);
            wp_send_json($licenseData);

            die();
        }
    }

    /**
     * Settings query.
     *
     * @since 1.0
     */
    static function fabrikatSettingsQuery()
    {
        if (wp_verify_nonce($_POST["nonce"], "ajax-nonce")) {
            $settings = $_POST["settings"];

            delete_option(self::$prefix . "settings");
            update_option(
                self::$prefix . "settings",
                json_decode(stripslashes(html_entity_decode($settings)))
            );

            wp_send_json(["success" => true]);

            die();
        }
    }
}
