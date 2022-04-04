<?php

/**
 * Plugin Name: Streamline
 * Plugin URI: https://wpstreamline.com
 * Description: Use WordPress faster.
 * Author: Fabrikat
 * Version: 1.1.5
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 */

const STREAMLINE = __FILE__;
const STREAMLINE_DIR = __DIR__;
const STREAMLINE_STORE_URL = "http://wpstreamline.com";
const STREAMLINE_ITEM_ID = 45;
const STREAMLINE_ITEM_NAME = "Streamline";
const STREAMLINE_LICENSE_PAGE = "streamline";

/**
 * Exit if accessed directly.
 *
 * @date    03/05/2021
 * @since   1.0.0
 */
if (!defined("ABSPATH")) {
    exit();
}

/**
 * Require files.
 *
 * @date    03/05/2021
 * @since   1.0.0
 */
require_once plugin_dir_path(__FILE__) . "includes/classes/init.php";
require_once plugin_dir_path(__FILE__) . "includes/classes/rest.php";
require_once plugin_dir_path(__FILE__) . "includes/classes/json.php";

if (!class_exists("EDD_SL_Plugin_Updater")) {
    include plugin_dir_path(__FILE__) . "includes/admin/edd-sl-updater.php";
}

require_once plugin_dir_path(__FILE__) .
    "includes/admin/streamline-updater.php";

/**
 * Init plugin.
 *
 * @date    19/10/2021
 * @since   1.0.0
 */
StreamlinePlugin::init(
    "streamline_",
    STREAMLINE_ITEM_NAME,
    STREAMLINE_STORE_URL,
    STREAMLINE_ITEM_ID,
    STREAMLINE_LICENSE_PAGE,
    STREAMLINE
);
