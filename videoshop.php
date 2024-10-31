<?php
/**
Plugin Name: Product Feature Video and Gallery
Description: Add Product feature Video and video gallery on WooCommerce Shop page, Archive page, Category page and Product single page. You can add video from YouTube, Vimeo and uploaded to your own Media Library.
Author: Mircode
Author URI: https://www.mircode.com
Date: 11/03/2023
Version: 1.0.2
Text Domain: videoshop
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html
WC requires at least: 3.0
WC tested up to: 8.0.2
-------------------------------------------------*/

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}
define( 'VIDEOSHOP_PATH', plugin_dir_path( __FILE__ ) );
define( 'VIDEOSHOP_URL', plugin_dir_url( __FILE__ ) );
define( 'VIDEOSHOP_FILE', __FILE__ );
define( 'VIDEOSHOP_PLUGIN_URL', 'https://videoshop.mircode.com/' );
define( 'VIDEOSHOP_PLUGIN_NAME', 'VideoShop' );
define( 'VIDEOSHOP_PLUGIN_VERSION', '1.0.1' );


require_once('inc/functions.php');
require_once('inc/videoshop_activation_hook.php');
require_once('inc/settings.php');
require_once('inc/class-videoshop.php');