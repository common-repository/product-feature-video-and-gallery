<?php

if ( ! defined( 'ABSPATH' ) ) exit;

if (!class_exists('VideoShop_Activation_Controller')) {
	class VideoShop_Activation_Controller
	{

		public function __construct()
		{
			register_activation_hook("videoshop/videoshop.php", array($this, 'execute_activation_hooks'));
		}

		public function execute_activation_hooks()
		{
			set_transient('videoshop-plugin_setting_notice', true, 0);
			if (empty(get_option('videoshop_slider_layout'))) {
				update_option('videoshop_slider_layout', 'horizontal');
				update_option('videoshop_slider_responsive', 'no');
				update_option('videoshop_sliderautoplay', 'no');
				update_option('videoshop_sliderfade', 'no');
				update_option('videoshop_slider_swipe', 'no');
				update_option('videoshop_arrowinfinite', 'yes');
				update_option('videoshop_arrowdisable', 'yes');
				update_option('videoshop_arrow_thumb', 'no');
				update_option('videoshop_hide_thumbnails', 'no');
				update_option('videoshop_hide_thumbnail', 'yes');
				update_option('videoshop_gallery_action', 'no');
				update_option('videoshop_adaptive_height', 'yes');
				update_option('videoshop_place_of_the_video', 'no');
				update_option('videoshop_videoloop', 'no');
				update_option('videoshop_vid_autoplay', 'no');
				update_option('videoshop_template', 'no');
				update_option('videoshop_controls', 'yes');
				update_option('videoshop_show_lightbox', 'yes');
				update_option('videoshop_show_zoom', 'yes');
				update_option('videoshop_zoomlevel', 1);
				update_option('videoshop_show_only_video', 'no');
				update_option('videoshop_thumbnails_to_show', 4);
				update_option('videoshop_arrowcolor', '#000');
				update_option('videoshop_arrowbgcolor', '#FFF');
			}
		}
	}
}
