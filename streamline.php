<?php

/**
 * Plugin Name: Streamline
 * Plugin URI: https://wpstreamline.com
 * Description: Do things faster.
 * Author: Fabrikat
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 */

define( 'STREAMLINE', __FILE__ );
define( 'STREAMLINE_DIR', __DIR__ );
define( 'STREAMLINE_STORE_URL', 'http://wpstreamline.com' );
define( 'STREAMLINE_ITEM_ID', 31 );
define( 'STREAMLINE_ITEM_NAME', 'Streamline' );
define( 'STREAMLINE_LICENSE_PAGE', 'streamline-license' );

use Streamline\init;

/**
 * Exit if accessed directly.
 *
 * @date    03/05/2021
 * @since   1.0.0
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Require files.
 *
 * @date    03/05/2021
 * @since   1.0.0
 */
require_once plugin_dir_path( __FILE__ ) . 'includes/classes/init.php';
require_once plugin_dir_path( __FILE__ ) . 'includes/functions/ajax-query.php';

if ( ! class_exists( 'EDD_SL_Plugin_Updater' ) ) {
	include( plugin_dir_path( __FILE__ ) . 'includes/admin/edd-sl-updater.php' );
}

require_once plugin_dir_path( __FILE__ ) . 'includes/admin/fabrikat-updater.php';

/**
 * Init plugin.
 *
 * @date    19/10/2021
 * @since   1.0.0
 */
FabrikatPlugin::init( 'streamline_', STREAMLINE_ITEM_NAME, STREAMLINE_STORE_URL, STREAMLINE_ITEM_ID, STREAMLINE_LICENSE_PAGE, STREAMLINE );

/**
 * Init Streamline.
 *
 * @date    03/05/2021
 * @since   1.0.0
 */
new Init();
