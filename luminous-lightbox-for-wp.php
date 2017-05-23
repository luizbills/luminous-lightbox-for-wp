<?php
/*
Plugin Name: Luminous Lightbox for WordPress
Description: Simple image lightbox plugin.
Version: 1.0.0

Author: Luiz Bills
Author URI: https://luizp.com

License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Text Domain: luminous-lightbox-for-wp
Domain Path: /languages/

WC requires at least: 2.5
WC tested up to: 3.0
*/

if ( ! defined( 'ABSPATH' ) ) die;

define( 'LLFWP_VERSION', '1.0.0' );

define( 'LLFWP_SLUG', 'luminous-lightbox-for-wp' );
define( 'LLFWP_PREFIX', 'luminous_lightbox_for_wp' );

define( 'LLFWP_FILE', __FILE__ );
define( 'LLFWP_DIR', dirname( __FILE__ ) );
define( 'LLFWP_ASSETS_DIR', trailingslashit( LLFWP_DIR ) . 'static' );
define( 'LLFWP_ASSETS_URL', esc_url( trailingslashit( plugins_url( '/static/', __FILE__) ) ) );

add_action( 'wp_enqueue_scripts', 'llfwp_enqueue_scripts' );
function llfwp_enqueue_scripts () {
	$suffix = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG === true ? '' : '.min';

	wp_enqueue_script( 'llfwp-luminous', LLFWP_ASSETS_URL . "js/luminous$suffix.js", array(), LLFWP_VERSION, true );
	wp_enqueue_script( 'llfwp-luminous-init', LLFWP_ASSETS_URL . "js/luminous-init$suffix.js", array( 'llfwp-luminous' ), LLFWP_VERSION, true );

	wp_localize_script( 'llfwp-luminous-init', 'llfwp_luminous_args', array(
		'selector' => apply_filters( 'llfwp_selector', 'a[href*=".jpg"], a[href*=".jpge"], a[href*=".png"]' )
	) );

	wp_enqueue_style( 'llfwp-luminous', LLFWP_ASSETS_URL . "css/luminous-basic$suffix.css", array(), LLFWP_VERSION );
}
