<?php

class VIDEOSHOP_MAIN_CLASS {
	/** @var $extend Lic value */
	public $extend;

	function __construct() {
		$this->add_actions( new VIDEOSHOP_ACTIVATE_LICENSE() );
	}
	private function add_actions( $extend ) {
		$this->extend = $extend;
		add_action( 'admin_notices', array( $this, 'videoshop_notice_callback_notice' ) );
		add_action( 'admin_menu', array( $this, 'videoshop_video_gallery_setup' ) );
		add_action( 'admin_init', array( $this, 'videoshop_update_video_gallery_options' ) );
		add_action( 'add_meta_boxes', array( $this, 'add_video_url_field' ) );
		add_action( 'save_post', array( $this, 'videoshop_save_video_url_field' ) );
		add_action( 'wp_enqueue_scripts', array( $this, 'videoshop_enqueue_scripts' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'videoshop_admin_enqueue_scripts' ) );
		add_filter( 'plugin_action_links_' . plugin_basename( __FILE__ ), array( $this, 'videoshop_product_video_slider_settings_link' ) );
		add_shortcode( 'videoshop_shortcode', array( $this, 'videoshop_shortcode_callback' ) );
		add_filter( 'wc_get_template', array( $this, 'videoshop_get_template' ), 99, 5 );
		add_filter('plugin_row_meta', array( $this, 'videoshop_plugin_row_meta'), 10, 2);
	}
	
	function videoshop_plugin_row_meta($links, $file) {
		$videoshop_lic = get_option( 'videoshop_info' );
		$isActive = false;
		if ( ! empty( $videoshop_lic ) ) {
			$var_res  = unserialize( base64_decode( $videoshop_lic ) );
			$site_url = preg_replace( '#^[^:/.]*[:/]+#i', '', get_site_url() );
			if ( $var_res['rd'] == $site_url ) {
				$isActive = true;
			}else{
				$isActive = false;
			}
		} else {
			$isActive = false;
		}
		if (plugin_basename(__FILE__) == $file && !$isActive) {
			$row_meta = array(
				'videoshop_pro'    => '<a href="' . esc_url('https://wpapplab.com/plugins/videoshop-woocommerce-product-feature-video/') . '" target="_blank" aria-label="' . esc_attr__('WooCommerce Product Feature Video', 'VideoShop') . '" style="color:red;"><b>' . esc_html__('Get Pro Version', 'VideoShop') . '</b></a>'
			);
	
			return array_merge($links, $row_meta);
		}
		return (array) $links;
	}

	public function videoshop_notice_callback_notice() {
		if ( get_transient( 'videoshop-plugin_setting_notice' ) ) {
			echo '<div class="notice-info notice is-dismissible"><p><strong>Woocommerce Product Video is almost ready.</strong> To Complete Your Configuration, <a href="' . esc_url( admin_url() ) . 'edit.php?post_type=product&page=wc-videoshop">Complete the setup</a>.</p></div>';
			delete_transient( 'videoshop-plugin_setting_notice' );
		}
	}
	public function videoshop_video_gallery_setup() {
		add_submenu_page( 'edit.php?post_type=product', 'Woocommerce Product Video', 'VideoShop', 'manage_options', 'wc-videoshop', array( $this, 'wc_videoshop_callback' ) );
	}
	public function videoshop_shortcode_callback( $atts = array() ) {
		ob_start();
		echo '<span id="videoshop_shortcode">';
		$lic_status = $this->extend->is_videoshop_active();
		if ( $lic_status ) {
			videoshop_show_product_image('shortcode');
		} else {
			echo 'To use shortcode you need to activate license key...!!';
		}
		echo '</span>';
		return ob_get_clean();
	}
	public function videoshop_get_template( $located, $template_name, $args, $template_path, $default_path ) {
		if ( is_product() && 'single-product/product-image.php' == $template_name && get_option( 'videoshop_template' ) == 'yes' ) {
			$located = plugin_dir_path( __FILE__ ).'template/product-video-template.php';
		}
		return $located;
	}
	public function wc_videoshop_callback() {
		wp_enqueue_media();
		wp_enqueue_style( 'wp-color-picker' );
		wp_enqueue_script( 'wp-color-picker' );
		echo '<div class="wc-videoshop-title"><h1>VideoShop - Woocommerce Product Feature Video</h1></div>';
		if ( isset( $_REQUEST['_wpnonce'] ) && wp_verify_nonce( sanitize_text_field( wp_unslash ($_REQUEST['_wpnonce'])), 'videoshop-license-deactive' ) && isset( $_REQUEST['deactivate_wc_videoshop_license'] ) ) {
			if ( $this->extend->videoshop_deactivate() ) {
				echo '<div id="message" class="updated fade"><p><strong>License Deactivated successfully...!!!</strong></p></div>';
			} else {
				echo '<div id="message" class="updated fade" style="border-left-color:#a00;"><p><strong>' . esc_html( $this->extend->err ) . '</strong></p></div>';
			}
		}
		$lic_status = $this->extend->is_videoshop_active();
		if ( isset( $_REQUEST['_wpnonce'] ) && wp_verify_nonce( sanitize_text_field( wp_unslash ($_REQUEST['_wpnonce'])), 'videoshop-license-active' ) && isset( $_REQUEST['activate_videoshop_license'] ) && ! empty( $_POST['wc_videoshop_license_key'] ) ) {
			$lic_status = $this->extend->videoshop_activate( sanitize_text_field( $_POST['wc_videoshop_license_key'] ) );
		}
		echo '<div class="wrap tab_wrapper wc_videoshop_aria">
			<div class="main-panel">
				<div id="tab_dashbord" class="techno_main_tabs active"><a href="#dashbord">Settings</a></div>
				<div id="tab_premium" class="techno_main_tabs"><a href="#premium">License</a></div>
			</div>
			<div class="boxed" id="percentage_form">
				<div class="videoshop_tabs tab_dashbord">
					<div class="wrap woocommerce">
						<form method="post" action="options.php">';
							settings_fields( 'wc_videoshop_gallery_options' );
							do_settings_sections( 'wc_videoshop_gallery_options' ); echo '
							<h2>Product Feature Video Settings</h2>';
							if ( $lic_status ) {
							echo '<div id="wc_prd_vid_slider-description">
								<p>The following options are used to configure Product Video Gallery</p>
							</div>
							<table class="form-table">
								<tbody>
									<tr valign="top">
										<th scope="row" class="titledesc">
											<label for="videoshop_slider_layout">Slider Layout </label>
										</th>
										<td class="forminp forminp-select">
											<select name="videoshop_slider_layout" id="videoshop_slider_layout" style="">
												<option value="horizontal" ' . selected( 'horizontal', get_option( 'videoshop_slider_layout' ), false ) . '>Horizontal</option>
												<option value="left" ' . selected( 'left', get_option( 'videoshop_slider_layout' ), false ) . '>Vertical Left</option>
												<option value="right" ' . selected( 'right', get_option( 'videoshop_slider_layout' ), false ) . '>Vertical Right</option>
											</select>
										</td>
									</tr>
									<tr valign="top">
										<th scope="row" class="titledesc"><label for="videoshop_slider_responsive">Slider Responsive</label></th>
										<td class="forminp forminp-checkbox">
											<input name="videoshop_slider_responsive" id="videoshop_slider_responsive" type="checkbox" value="yes" ' . checked( 'yes', get_option( 'videoshop_slider_responsive' ), false ) . '>
											<samll class="lbl_tc">This option set the slider layout as Horizontal on mobile.</samll>
										</td>
									</tr>
									<tr valign="top">
										<th scope="row" class="titledesc"><label for="videoshop_sliderautoplay">Slider Auto-play</label></th>
										<td class="forminp forminp-checkbox">
											<input name="videoshop_sliderautoplay" id="videoshop_sliderautoplay" type="checkbox" value="yes" ' . checked( 'yes', get_option( 'videoshop_sliderautoplay' ), false ) . '>
										</td>
									</tr>
									<tr valign="top">
										<th scope="row" class="titledesc"><label for="videoshop_slider_swipe">Slider Swipe</label></th>
										<td class="forminp forminp-checkbox">
											<input name="videoshop_slider_swipe" id="videoshop_slider_swipe" type="checkbox" value="yes" ' . checked( 'yes', get_option( 'videoshop_slider_swipe' ), false ) . '>
										</td>
									</tr>
									<tr valign="top">
										<th scope="row" class="titledesc"><label for="videoshop_sliderfade">Slider Fade</label></th>
										<td class="forminp forminp-checkbox">
											<input name="videoshop_sliderfade" id="videoshop_sliderfade" type="checkbox" value="yes" ' . checked( 'yes', get_option( 'videoshop_sliderfade' ), false ) . '>
										</td>
									</tr>
									<tr valign="top">
										<th scope="row" class="titledesc"><label for="videoshop_arrowinfinite">Slider Infinite Loop</label></th>
										<td class="forminp forminp-checkbox">
											<input name="videoshop_arrowinfinite" id="videoshop_arrowinfinite" type="checkbox" value="yes" ' . checked( 'yes', get_option( 'videoshop_arrowinfinite' ), false ) . '>
										</td>
									</tr>
									<tr valign="top">
										<th scope="row" class="titledesc"><label for="videoshop_arrowdisable">Arrow on Slider</label></th>
										<td class="forminp forminp-checkbox">
											<input name="videoshop_arrowdisable" id="videoshop_arrowdisable" type="checkbox" value="yes" ' . checked( 'yes', get_option( 'videoshop_arrowdisable' ), false ) . '>
										</td>
									</tr>
									<tr valign="top">
										<th scope="row" class="titledesc"><label for="videoshop_arrow_thumb">Arrow on Thumbnails</label></th>
										<td class="forminp forminp-checkbox">
											<input name="videoshop_arrow_thumb" id="videoshop_arrow_thumb" type="checkbox" value="yes" ' . checked( 'yes', get_option( 'videoshop_arrow_thumb' ), false ) . '>
										</td>
									</tr>
									<tr valign="top">
										<th scope="row" class="titledesc"><label for="custom_icon">Video Thumbnail for all Products.</label></th>
										<td class="forminp forminp-checkbox">
											<img style="max-width:80px;max-height:80px;" id="custom_video_thumb" src="' . esc_url( wp_get_attachment_image_url( get_option( 'custom_icon' ), 'thumbnail' ) ) . '">
											<input type="hidden" name="custom_icon" id="custom_icon" value="' . esc_attr( get_option( 'custom_icon' ) ) . '"/>
											<lable type="submit" class="upload_image_button button">Select Thumbnail</lable>
											<lable type="submit" class="remove_image_button button">X</lable>
										</td>
									</tr>
									<tr valign="top">
										<th scope="row" class="titledesc"><label for="videoshop_show_lightbox">Light-box</label></th>
										<td class="forminp forminp-checkbox">
											<input name="videoshop_show_lightbox" id="videoshop_show_lightbox" type="checkbox" value="yes" ' . checked( 'yes', get_option( 'videoshop_show_lightbox' ), false ) . '>
										</td>
									</tr>
									<tr valign="top">
										<th scope="row" class="titledesc"><label for="videoshop_show_zoom">Zoom style</label></th>
										<td class="forminp forminp-checkbox">
											<select name="videoshop_show_zoom" id="videoshop_show_zoom" style="">
												<option value="window" ' . selected( 'window', get_option( 'videoshop_show_zoom' ), false ) . '>Window Right side</option>
												<option value="yes" ' . selected( 'yes', get_option( 'videoshop_show_zoom' ), false ) . '>Inner</option>
												<option value="lens" ' . selected( 'lens', get_option( 'videoshop_show_zoom' ), false ) . '>Lens</option>
												<option value="off" ' . selected( 'off', get_option( 'videoshop_show_zoom' ), false ) . '>Off</option>
											</select>
										</td>
									</tr>									
									<tr valign="top">
										<th scope="row" class="titledesc"><label for="videoshop_zoomlevel">Zoom Level</label></th>
										<td class="forminp forminp-checkbox">
											<input name="videoshop_zoomlevel" id="videoshop_zoomlevel" type="number" min="0.1" max="10" step="0.01" value="' . esc_attr( get_option( 'videoshop_zoomlevel', 1 ) ) . '">
										</td>
									</tr>									
									<tr valign="top">
										<th scope="row" class="titledesc"><label for="videoshop_template">Allow Template Filter</label></th>
										<td class="forminp forminp-checkbox">
											<input name="videoshop_template" id="videoshop_template" type="checkbox" value="yes" ' . checked( 'yes', get_option( 'videoshop_template', 'no' ), false ) . '>
											<samll class="lbl_tc">Enable this if your single product pages edited with help of any page builders Divi Builder, Elementor Builder etc.</samll>
										</td>
									</tr>
									<tr valign="top">
										<th scope="row" class="titledesc"><label for="videoshop_gallery_action">Remove Action</label></th>
										<td class="forminp forminp-checkbox">
											<input name="videoshop_gallery_action" id="videoshop_gallery_action" type="checkbox" value="yes" ' . checked( 'yes', get_option( 'videoshop_gallery_action', 'no' ), false ) . '>
											<samll class="lbl_tc">Enable this if your single product pages edited with help of Divi Builder.</samll>
										</td>
									</tr>
									<tr valign="top">
										<th scope="row" class="titledesc"><label for="videoshop_hide_thumbnails">Hide Thumbnails</label></th>
										<td class="forminp forminp-checkbox">
											<input name="videoshop_hide_thumbnails" id="videoshop_hide_thumbnails" type="checkbox" value="yes" ' . checked( 'yes', get_option( 'videoshop_hide_thumbnails' ), false ) . '>
										</td>
									</tr>
									<tr valign="top">
										<th scope="row" class="titledesc"><label for="videoshop_hide_thumbnail">Hide Thumbnail</label></th>
										<td class="forminp forminp-checkbox">
											<input name="videoshop_hide_thumbnail" id="videoshop_hide_thumbnail" type="checkbox" value="yes" ' . checked( 'yes', get_option( 'videoshop_hide_thumbnail', 'yes' ), false ) . '>
											<samll class="lbl_tc">Hide thumbnail if product have only one image/video.</samll>
										</td>
									</tr>
									<tr valign="top">
										<th scope="row" class="titledesc"><label for="videoshop_thumbnails_to_show">Thumbnails to show</label></th>
										<td class="forminp forminp-checkbox">
											<input name="videoshop_thumbnails_to_show" id="videoshop_thumbnails_to_show" type="number" min="3" max="8" value="' . esc_attr( get_option( 'videoshop_thumbnails_to_show', 4 ) ) . '"><small> Set how many thumbnails to show. You can show min 3 and  max 8 thumbnails.</small>
										</td>
									</tr>
									<tr valign="top">
										<th scope="row" class="titledesc"><label for="videoshop_adaptive_height">Adaptive Height</label></th>
										<td class="forminp forminp-checkbox">
											<input name="videoshop_adaptive_height" id="videoshop_adaptive_height" type="checkbox" value="yes" ' . checked( 'yes', get_option( 'videoshop_adaptive_height', 'yes' ), false ) . '>
											<samll class="lbl_tc">Slider height based on images automatically.</samll>
										</td>
									</tr>
									<tr valign="top">
										<th scope="row" class="titledesc"><label for="videoshop_show_only_video">Show Only Video</label></th>
										<td class="forminp forminp-checkbox">
											<input name="videoshop_show_only_video" id="videoshop_show_only_video" type="checkbox" value="yes" ' . checked( 'yes', get_option( 'videoshop_show_only_video', 'no' ), false ) . '>
											<samll>Only show the videos on gellery.</samll>
										</td>
									</tr>
									<tr valign="top">
										<th scope="row" class="titledesc"><label for="videoshop_controls">Show Video Controls</label></th>
										<td class="forminp forminp-checkbox">
											<input name="videoshop_controls" id="videoshop_controls" type="checkbox" value="yes" ' . checked( 'yes', get_option( 'videoshop_controls', 'yes' ), false ) . '>
											<samll class="lbl_tc">Only for Self Hosted Video</samll>
										</td>
									</tr>
									<tr valign="top">
										<th scope="row" class="titledesc"><label for="videoshop_videoloop">Video Looping</label></th>
										<td class="forminp forminp-checkbox">
											<input name="videoshop_videoloop" id="videoshop_videoloop" type="checkbox" value="yes" ' . checked( 'yes', get_option( 'videoshop_videoloop' ), false ) . '>
											<samll class="lbl_tc">Looping a video is allowing the video to play in a repeat mode.</samll>
											<p><samll>Auto play works only when <b>Place of The Video</b> is <b>Before Product Gallery Images</b>.</samll></p>
										</td>
									</tr>
									<tr valign="top">
										<th scope="row" class="titledesc"><label for="videoshop_vid_autoplay">Auto Play Video</label></th>
										<td class="forminp forminp-checkbox">
											<input name="videoshop_vid_autoplay" id="videoshop_vid_autoplay" type="checkbox" value="yes" ' . checked( 'yes', get_option( 'videoshop_vid_autoplay' ), false ) . '>
											<samll>Auto play works only when <b>Place of The Video</b> is <b>Before Product Gallery Images</b>.</samll>
											<p><samll>If you enable this option, the video will be muted by default, so you have to manually unmute the video.</samll></p>
											<p><samll>Please pass <b>autoplay=1</b> parameter with your video url if you are using YouTube or Vimeo video.</samll></p>
										</td>
									</tr>
									<tr valign="top">
										<th scope="row" class="titledesc"><label for="videoshop_place_of_the_video">Place Of The Video</label></th>
										<td class="forminp forminp-checkbox">
											<select name="videoshop_place_of_the_video" id="videoshop_place_of_the_video" style="">
												<option value="no" ' . selected( 'no', get_option( 'videoshop_place_of_the_video' ), false ) . '>After Product Gallery Images</option>
												<option value="second" ' . selected( 'second', get_option( 'videoshop_place_of_the_video' ), false ) . '>After Product Image</option>
												<option value="yes" ' . selected( 'yes', get_option( 'videoshop_place_of_the_video' ), false ) . '>Before Product Gallery Images</option>
											</select>
										</td>
									</tr>
									<tr valign="top">
										<th scope="row" class="titledesc"><label for="videoshop_arrowcolor">Arrow Color</label></th>
										<td class="forminp forminp-color">
											<input name="videoshop_arrowcolor" id="videoshop_arrowcolor" type="text" value="' . esc_attr( get_option( 'videoshop_arrowcolor' ) ) . '" class="colorpick">
										</td>
									</tr>
									<tr valign="top">
										<th scope="row" class="titledesc"><label for="videoshop_arrowbgcolor">Arrow Background Color</label></th>
										<td class="forminp forminp-color">
											<input name="videoshop_arrowbgcolor" id="videoshop_arrowbgcolor" type="text" value="' . esc_attr( get_option( 'videoshop_arrowbgcolor' ) ) . '" class="colorpick">
										</td>
									</tr>
									<tr valign="top">
										<th scope="row" class="titledesc"><label for="videoshop_aspect_ratio">Video Aspect ratio</label></th>
										<td class="forminp forminp-checkbox">
											<select name="videoshop_aspect_ratio" id="videoshop_aspect_ratio" style="">
												<option value="16x9" ' . selected( '16x9', get_option( 'videoshop_aspect_ratio' ), false ) . '>16:9</option>
												<option value="4x3" ' . selected( '4x3', get_option( 'videoshop_aspect_ratio' ), false ) . '>4:3</option>
												<option value="1x1" ' . selected( '1x1', get_option( 'videoshop_aspect_ratio' ), false ) . '>1:1</option>
											</select>
											<small id="videoshop_aspect_ratio_desc">This will determine the height of the video on woocommerce shop and archive page.</small>
										</td>
									</tr>
									<tr valign="top">
										<th scope="row" class="titledesc"><label for="videoshop_on_shop_page">Show video on Shop/Archive Page?</label></th>
										<td class="forminp forminp-checkbox">
											<input name="videoshop_on_shop_page" id="videoshop_on_shop_page" type="checkbox" value="yes" ' . checked( 'yes', get_option( 'videoshop_on_shop_page' ), false ) . '>
										</td>
									</tr>
									<tr valign="top">
										<th scope="row" class="titledesc"><label for="videoshop_shortcode">Shortcode</label></th>
										<td class="forminp forminp-info">
											<small id="videoshop_shortcode">Use this <b>[videoshop_shortcode]</b> shortcode if your product pages edited with help of any page builders (Divi Builder, Elementor Builder etc.)</small>
										</td>
									</tr>
								</tbody>
								<tfoot><tr><td class="submit_btn_cls">';
								submit_button();
								echo '</td></tr></tfoot>
							</table>';
							}else{
							echo '<div id="message" class="updated" style="border-left-color:#a00;"><p><strong>Please Activate License to Edit Settings. <a href="https://wpapplab.com/plugins/videoshop-woocommerce-product-feature-video/" target="_blank">Buy Premium</a> License or go to <a href="https://wpapplab.com/my-account/view-license-keys/" target="_blank">wpapplab.com</a> account page and find your license key.</strong></p></div>';
							}
						echo '</form>
					</div>
				</div>
				<div class="videoshop_tabs tab_premium" style="display:none;">';
		if ( isset( $_REQUEST['activate_videoshop_license'] ) && isset( $_REQUEST['_wpnonce'] ) && wp_verify_nonce( sanitize_text_field( wp_unslash ($_REQUEST['_wpnonce'])), 'videoshop-license-active' ) ) {
			if ( $lic_status ) {
				echo '<div id="message" class="updated fade"><p><strong>License Activated successfully...!!!</strong></p></div>
				<form method="POST">';
					wp_nonce_field( 'videoshop-license-deactive' );
					echo '<div class="col-50">
						<h2> Thank You Phurchasing ...!!!</h2>
						<h4 class="paid_color">Deactivate Your License:</h4>
						<p class="submit">
							<input type="submit" name="deactivate_wc_videoshop_license" value="Deactivate" class="button button-primary">
						</p>
					</div>
				</form>';
			} else {
				$this->wc_videoshop_pro_html();
				echo '<div id="message" class="updated fade" style="border-left-color:#a00;"><p><strong>' . esc_html( $this->extend->err ) . '</strong></p></div>';
			}
		} elseif ( $this->extend->is_videoshop_active() ) {

			echo '<form method="POST">';
					wp_nonce_field( 'videoshop-license-deactive' );
					echo '<div class="col-50">
					<h2> Thank You for Purchasing ...!!!</h2>
					<h4 class="paid_color">Deactivate Your License:</h4>
					<p class="submit">
						<input type="submit" name="deactivate_wc_videoshop_license" value="Deactivate" class="button button-primary">
					</p>
				</div>
			</form>';
		} else {
			$this->wc_videoshop_pro_html();
			echo esc_html( $this->extend->err );
		}
		echo '</div></div></div>';
	}
	public function wc_videoshop_pro_html() {
		$pugin_path = plugin_dir_url( __FILE__ ); 
		echo '<form method="POST">';
		wp_nonce_field( 'videoshop-license-active' );
		echo '<div class="col-50">
			<p><label for="wc_videoshopkey">License Key : </label><input class="regular-text" type="password" id="wc_videoshop_license_key" name="wc_videoshop_license_key"></p>
			<p class="submit">
			<input type="submit" name="activate_videoshop_license" value="Activate" class="button button-primary">
			</p>
		</div>
		</form>';
	}
	public function videoshop_update_video_gallery_options( $value = '' ) {
		register_setting( 'wc_videoshop_gallery_options', 'videoshop_slider_layout' );
		register_setting( 'wc_videoshop_gallery_options', 'videoshop_slider_responsive' );
		register_setting( 'wc_videoshop_gallery_options', 'videoshop_sliderautoplay' );
		register_setting( 'wc_videoshop_gallery_options', 'videoshop_slider_swipe' );
		register_setting( 'wc_videoshop_gallery_options', 'videoshop_sliderfade' );
		register_setting( 'wc_videoshop_gallery_options', 'videoshop_arrowinfinite' );
		register_setting( 'wc_videoshop_gallery_options', 'videoshop_arrowdisable' );
		register_setting( 'wc_videoshop_gallery_options', 'videoshop_arrow_thumb' );
		register_setting( 'wc_videoshop_gallery_options', 'videoshop_show_lightbox' );
		register_setting( 'wc_videoshop_gallery_options', 'videoshop_show_zoom' );
		register_setting( 'wc_videoshop_gallery_options', 'videoshop_zoomlevel' );
		register_setting( 'wc_videoshop_gallery_options', 'videoshop_arrowcolor' );
		register_setting( 'wc_videoshop_gallery_options', 'videoshop_show_only_video' );
		register_setting( 'wc_videoshop_gallery_options', 'custom_icon' );
		register_setting( 'wc_videoshop_gallery_options', 'videoshop_hide_thumbnails' );
		register_setting( 'wc_videoshop_gallery_options', 'videoshop_hide_thumbnail' );
		register_setting( 'wc_videoshop_gallery_options', 'videoshop_gallery_action' );
		register_setting( 'wc_videoshop_gallery_options', 'videoshop_template' );
		register_setting( 'wc_videoshop_gallery_options', 'videoshop_thumbnails_to_show' );
		register_setting( 'wc_videoshop_gallery_options', 'videoshop_arrowbgcolor' );
		register_setting( 'wc_videoshop_gallery_options', 'videoshop_adaptive_height' );
		register_setting( 'wc_videoshop_gallery_options', 'videoshop_videoloop' );
		register_setting( 'wc_videoshop_gallery_options', 'videoshop_vid_autoplay' );
		register_setting( 'wc_videoshop_gallery_options', 'videoshop_controls' );
		register_setting( 'wc_videoshop_gallery_options', 'videoshop_place_of_the_video' );
		register_setting( 'wc_videoshop_gallery_options', 'videoshop_aspect_ratio' );
		register_setting( 'wc_videoshop_gallery_options', 'videoshop_on_shop_page' );
	}
	public function videoshop_product_video_slider_settings_link( $links ) {
		$links[] = '<a href="' . esc_url( admin_url() ) . 'edit.php?post_type=product&page=wc-videoshop">Settings</a>';
		return $links;
	}
	public function add_video_url_field() {
		add_meta_box( 'video_url', 'Product Video Url', array( $this, 'video_url_field' ), 'product' );
	}
	public function get_video_field_html( $product_video_type, $product_video_url, $custom_thumbnail, $product_video_thumb_url, $product_video_thumb_id, $video_schema, $video_upload_date, $video_name, $video_description ) {
		echo '<tr>
			<td colspan="2">
				<div class="video_url_aria">
					<div>
						<label class="videoshop_lbl videoshop_product_video_type_lbl" for="videoshop_product_video_type">Video Type</label>
						<select name="videoshop_product_video_type[]" class="videoshop_input">
							<option value="videoshop_video_url_youtube" ' . selected( $product_video_type, 'videoshop_video_url_youtube', false ) . '>Youtube Video</option>
							<option value="videoshop_video_url_vimeo" ' . selected( $product_video_type, 'videoshop_video_url_vimeo', false ) . '>Vimeo Video</option>
							<option value="videoshop_video_url_local" ' . selected( $product_video_type, 'videoshop_video_url_local', false ) . '>Self Hosted Video(MP4, WebM, and Ogg)</option>
							<option value="videoshop_video_url_iframe" ' . selected( $product_video_type, 'videoshop_video_url_iframe', false ) . '>Other (embedUrl)</option>
						</select>
					</div>
					<div style="display: inline-block;">
						<div style="display: inline-block; vertical-align: top;">
							<label class="videoshop_lbl" for="videoshop_video_text_urls">Video  Url</label>
						</div>
						<div style="display: inline-block;">
							<div>
								<input type="url" class="videoshop_input videoshop_video_text_urls" value="' . esc_url( $product_video_url ) . '" name="videoshop_video_text_url[]" placeholder="URL of your video">
								<span><label style="display: none;" class="select_video_button button">Select Video</label><input type="hidden" name="video_attachment_id" id="video_attachment_id"></span>
							</div>
							<div>
								<small style="display: none;" class="videoshop_url_info videoshop_video_url_youtube">https://www.youtube.com/embed/.....</small>
								<small style="display: none;" class="videoshop_url_info videoshop_video_url_vimeo">https://player.vimeo.com/video/......</small>
								<small style="display: none;" class="videoshop_url_info videoshop_video_url_iframe">Your embed video url.</small>
								<small style="display: none;" class="videoshop_url_info videoshop_video_url_local">' . esc_url( get_site_url() ) . '/wp-content/upload/......</small>
							</div>
						</div>
					</div>
					<div>
						<div>							
							<input type="hidden" value="' . esc_attr( $custom_thumbnail ) . '" name="custom_thumbnail[]">
							<label class="videoshop_tab"><input type="checkbox" class="custom_thumbnail" value="yes" ' . checked( 'yes', $custom_thumbnail, false ) . '> Use Custom video Thumbnail?</label>
						</div>
						<div class="select_video_thumbnail" style="display:' . ( ( $custom_thumbnail != 'yes' ) ? 'none' : 'block' ) . ';">
							<div class="video_thumbnail_aria">
								<img style="max-width:80px;max-height:80px;" class="product_video_thumb" src="' . esc_url( $product_video_thumb_url ) . '">
							</div>
							<div class="video_thumbnail_btn">
								<label class="select_video_thumb_button button">Select Video Thumbnail</label>
								<input type="hidden" value="' . esc_attr( $product_video_thumb_id ) . '" name="product_video_thumb_url[]" class="product_video_thumb_url">
								<lable type="submit" class="remove_image_button button">X</lable>
							</div>
						</div>
					</div>
					<div>
						<div>							
							<input type="hidden" value="' . esc_attr( $video_schema ) . '" name="video_schema[]">
							<label class="videoshop_tab"><input type="checkbox" class="video_schema" value="yes" ' . checked( 'yes', $video_schema, false ) . '> Add Video Schema?</label>
						</div>
						<div class="select_video_schema" style="display:' . ( ( $video_schema != 'yes' ) ? 'none' : 'block' ) . ';">
							<div class="video_schema_aria">
								<label class="videoshop_lbl_schema">Upload Date</label>
								<input type="date" value="' . esc_attr( $video_upload_date ) . '" name="videoshop_video_upload_date[]"> <small>The date the video was first published.</small>
							</div>
							<div class="video_schema_aria">
								<label class="videoshop_lbl_schema">Video Name</label>
								<input type="text" value="' . esc_attr( $video_name ) . '" name="videoshop_video_name[]"> <small>The title of the video.</small>
							</div>
							<div class="video_schema_aria">
								<label class="videoshop_lbl_schema">Video Description</label>
								<textarea name="videoshop_video_description[]" rows="2" cols="20">' . wp_kses_post($video_description) . '</textarea><small>The description of the video.</small>
							</div>
						</div>
					</div>
				</div>
				<div class="video_delete_aria"><b class="button video-remove-btn" title="Remove Video"><span class="dashicons dashicons-remove"></span></b></div>
			</td>
		</tr>';
	}
	public function videoshop_meta_extend_call( $product_id ) {
		wp_enqueue_script( 'media-upload' );
		wp_enqueue_media();
		$product_video_types     = get_post_meta( $product_id, '_videoshop_product_video_type', true );
		$product_video_urls      = get_post_meta( $product_id, '_videoshop_video_text_url', true );
		$product_video_thumb_ids = get_post_meta( $product_id, '_videoshop_product_video_thumb_ids', true );
		$custom_thumbnails       = get_post_meta( $product_id, '_custom_thumbnail', true );
		$video_schemas           = get_post_meta( $product_id, '_video_schema', true );
		$video_upload_dates      = get_post_meta( $product_id, '_videoshop_video_upload_date', true );
		$video_names             = get_post_meta( $product_id, '_videoshop_video_name', true );
		$video_descriptions      = get_post_meta( $product_id, '_videoshop_video_description', true );
		echo '
		<div class="videoshop_product_video_url_section">
			<table class="product_videos_tbl" style="width: 100%;">
				<thead><tr><th style="text-align: left;">Select Video Source</th><td style="text-align: right;"><button type="button" class="button add_video"><b><span class="dashicons dashicons-insert"></span></b> Add Video</button></td></tr></thead>
				<tbody>';
				if ( is_array($product_video_urls) ) {
					foreach ($product_video_urls as $key => $product_video_url) {
						$product_video_type = $product_video_types[$key];						
						$product_video_thumb_url = wc_placeholder_img_src();
						$product_video_thumb_id = '';
						if ( ! empty( $product_video_thumb_ids[$key] ) ) {
							$product_video_thumb_id = $product_video_thumb_ids[$key];
							$product_video_thumb_url = wp_get_attachment_image_url( $product_video_thumb_id );
						}
						$custom_thumbnail  = (isset($custom_thumbnails[$key])) ? $custom_thumbnails[$key] : 'no';
						$video_schema      = (isset($video_schemas[$key])) ? $video_schemas[$key] : 'no';
						$video_upload_date = (isset($video_upload_dates[$key])) ? $video_upload_dates[$key] : '';
						$video_name        = (isset($video_names[$key])) ? $video_names[$key] : '';
						$video_description = (isset($video_descriptions[$key])) ? $video_descriptions[$key] : '';
						
						$this->get_video_field_html( $product_video_types[$key], $product_video_url, $custom_thumbnail, $product_video_thumb_url, $product_video_thumb_id, $video_schema, $video_upload_date, $video_name, $video_description );
					}
				} else {
					$product_video_thumb_url = wc_placeholder_img_src();
					if ( ! empty( $product_video_thumb_ids ) ) {
						$product_video_thumb_url = wp_get_attachment_image_url( $product_video_thumb_ids );
					}
					$this->get_video_field_html( $product_video_types, $product_video_urls, $custom_thumbnails, $product_video_thumb_url, $product_video_thumb_ids, $video_schemas, $video_upload_dates, $video_names, $video_descriptions );
				}
				echo '
				</tbody>
			</table>
		</div>';
	}
	public function video_url_field() {
        wp_nonce_field( 'videoshop_video_url_nonce_action', 'videoshop_video_url_nonce' );
		$product_video_url = get_post_meta( get_the_ID(), '_videoshop_video_text_url', true );
		$product_video_thumb_id = get_post_meta( get_the_ID(), '_videoshop_product_video_thumb_ids', true );
		if ( ! $this->extend->is_videoshop_active() ) {
			$product_video_url = is_array($product_video_url) ? $product_video_url[0] : $product_video_url;
			$product_video_thumb_id = is_array($product_video_thumb_id) ? $product_video_thumb_id[0] : $product_video_thumb_id;
			echo '<div class="videoshop_product_video_url_section">
			<div style="display: inline-block; width: 80%;">
			<ul>
				<li>
					<input type="radio" checked name="videoshop_product_video_type[]" value="videoshop_video_url_youtube" id="videoshop_video_url_youtube">
					<label class="videoshop_tab active" for="videoshop_video_url_youtube">Youtube</label>
				</li>
				<li>
					<input type="radio" name="videoshop_product_video_type" disabled>
					<label class="videoshop_tab" for="videoshop_video_url_vimeo">Vimeo' . wc_help_tip( '<p style="font-size: 25px; font-weight: bold;>Activate License<br>Download license from <a href="https://wpapplab.com/my-account/view-license-keys/" target="_blank">wpapplab.com</a></p>', true ) . '</label>
				</li>
				<li>
					<input type="radio" name="videoshop_product_video_type" disabled>
					<label class="videoshop_tab" for="videoshop_video_url_local">Local/Hosted/WP Video URL' . wc_help_tip( '<p style="font-size: 25px; font-weight: bold;>Activate License<br>Download license from <a href="https://wpapplab.com/my-account/view-license-keys/" target="_blank">wpapplab.com</a></p>', true ) . '</label>
				</li>
			</ul><input type="hidden" value="' . esc_attr( $product_video_thumb_id ) . '" name="product_video_thumb_url[]" class="product_video_thumb_url">
			</div>
			<div style="display: inline-block;"><button type="button" class="button add_video" disabled><b><span class="dashicons dashicons-insert" style="vertical-align: middle;"></span></b> Add More Videos ' . wc_help_tip( '<p style="font-size: 25px; font-weight: bold;>Activate License<br>Download license from <a href="https://wpapplab.com/my-account/view-license-keys/" target="_blank">wpapplab.com</a></p>', true ) . '</button></div><div class="video-url-cls"><p>Type the URL of your Youtube Video, supports URLs of videos in websites only Youtube.</p><input class="video_input" style="width:100%;" type="url" class="videoshop_video_text_url" value="' . esc_url( $product_video_url ) . '" name="videoshop_video_text_url[]" Placeholder="https://www.youtube.com/embed/....."></div></div>';
		} else {
			$this->videoshop_meta_extend_call( get_the_ID() );
		}
	}
	public function videoshop_save_video_url_field( $post_id ) {
		$nonce_name   = isset( $_POST['videoshop_video_url_nonce'] ) ? sanitize_text_field( wp_unslash ($_POST['videoshop_video_url_nonce'])) : '';
		$nonce_action = 'videoshop_video_url_nonce_action';
		if ( ! wp_verify_nonce( $nonce_name, $nonce_action ) ) {
			return;
		}
		if ( isset( $_POST['videoshop_video_text_url'] ) ) {
			update_post_meta( $post_id, '_videoshop_video_text_url', array_map( 'sanitize_url', $_POST['videoshop_video_text_url'] ) );
		} else {
			delete_post_meta( $post_id, '_videoshop_video_text_url' );
		}
		if ( isset( $_POST['videoshop_product_video_type'] ) ) {
			update_post_meta( $post_id, '_videoshop_product_video_type', array_map( 'sanitize_text_field', $_POST['videoshop_product_video_type'] ) );
		} else {
			delete_post_meta( $post_id, '_videoshop_product_video_type' );
		}
		if ( isset( $_POST['custom_thumbnail'] ) ) {
			update_post_meta( $post_id, '_custom_thumbnail', array_map( 'sanitize_text_field', $_POST['custom_thumbnail'] ) );
		} else {
			delete_post_meta( $post_id, '_custom_thumbnail' );
		}
		if ( isset( $_POST['product_video_thumb_url'] ) ) {
			update_post_meta( $post_id, '_videoshop_product_video_thumb_ids', array_map( 'sanitize_text_field', $_POST['product_video_thumb_url'] ) );
		} else {
			delete_post_meta( $post_id, '_videoshop_product_video_thumb_ids' );
		}
		if ( isset( $_POST['video_schema'] ) ) {
			update_post_meta( $post_id, '_video_schema', array_map( 'sanitize_text_field', $_POST['video_schema'] ) );
		} else {
			delete_post_meta( $post_id, '_video_schema' );
		}
		if ( isset( $_POST['videoshop_video_upload_date'] ) ) {
			update_post_meta( $post_id, '_videoshop_video_upload_date', array_map( 'sanitize_text_field', $_POST['videoshop_video_upload_date'] ) );
		} else {
			delete_post_meta( $post_id, '_videoshop_video_upload_date' );
		}
		if ( isset( $_POST['videoshop_video_name'] ) ) {
			update_post_meta( $post_id, '_videoshop_video_name', array_map( 'sanitize_text_field', $_POST['videoshop_video_name'] ) );
		} else {
			delete_post_meta( $post_id, '_videoshop_video_name' );
		}
		if ( isset( $_POST['videoshop_video_description'] ) ) {
			update_post_meta( $post_id, '_videoshop_video_description', array_map( 'sanitize_textarea_field', $_POST['videoshop_video_description'] ) );
		} else {
			delete_post_meta( $post_id, '_videoshop_video_description' );
		}
	}
	public function videoshop_enqueue_scripts() {
		if ( ! is_admin() ) {
			if ( class_exists( 'WooCommerce' ) || is_product() || is_page_template( 'page-templates/template-products.php' ) ) {
				wp_enqueue_script( 'jquery' );
				if ( get_option( 'videoshop_show_lightbox' ) == 'yes' ) {
					wp_enqueue_script( 'videoshop-fancybox-js', plugins_url( 'js/jquery.fancybox.js', dirname(__FILE__) ), array( 'jquery' ), VIDEOSHOP_PLUGIN_VERSION, true );
					wp_enqueue_style( 'videoshop-fancybox-css', plugins_url( 'css/fancybox.css', dirname(__FILE__) ), '3.5.7', true );
				}
				if ( get_option( 'videoshop_show_zoom' ) != 'off' ) {
					wp_enqueue_script( 'videoshop-zoom-js', plugins_url( 'js/jquery.zoom.min.js', dirname(__FILE__) ), array( 'jquery' ), '1.7.4', true );
					wp_enqueue_script( 'videoshop-elevatezoom-js', plugins_url( 'js/jquery.elevatezoom.min.js', dirname(__FILE__) ), array( 'jquery' ), '3.0.8', true );
				}
				wp_enqueue_style( 'videoshop-fontawesome-css', plugins_url( 'css/font-awesome.min.css', dirname(__FILE__) ), '1.0', true );
				wp_enqueue_style( 'videoshop-css', plugins_url( 'css/videoshop.css', dirname(__FILE__) ), VIDEOSHOP_PLUGIN_VERSION, true );
				wp_register_script( 'videoshop-js', plugins_url( 'js/videoshop.js', dirname(__FILE__) ), array( 'jquery' ), VIDEOSHOP_PLUGIN_VERSION, true );
				$video_type = get_post_meta( get_the_ID(), '_videoshop_product_video_type', true );
				wp_enqueue_script( 'videoshop-vimeo-js', plugins_url( 'js/player.js', dirname(__FILE__) ), '1.0', true );
				wp_enqueue_style( 'dashicons' );
				$options           = get_option( 'videoshop_options' );
				$translation_array = array(
					'videoshop_slider_layout'      => get_option( 'videoshop_slider_layout' ),
					'videoshop_slider_responsive'  => get_option( 'videoshop_slider_responsive' ),
					'videoshop_sliderautoplay'     => get_option( 'videoshop_sliderautoplay' ),
					'videoshop_sliderfade'         => get_option( 'videoshop_sliderfade' ),
					'videoshop_rtl'                => is_rtl(),
					'videoshop_swipe'              => get_option( 'videoshop_slider_swipe' ),
					'videoshop_arrowinfinite'      => get_option( 'videoshop_arrowinfinite' ),
					'videoshop_arrowdisable'       => get_option( 'videoshop_arrowdisable' ),
					'videoshop_arrow_thumb'        => get_option( 'videoshop_arrow_thumb' ),
					'videoshop_hide_thumbnails'    => get_option( 'videoshop_hide_thumbnails' ),
					'videoshop_hide_thumbnail'     => get_option( 'videoshop_hide_thumbnail' ),
					'videoshop_adaptive_height'    => get_option( 'videoshop_adaptive_height', 'yes' ),
					'videoshop_thumbnails_to_show' => get_option( 'videoshop_thumbnails_to_show', 4 ),
					'videoshop_show_lightbox'      => get_option( 'videoshop_show_lightbox' ),
					'videoshop_show_zoom'          => get_option( 'videoshop_show_zoom' ),
					'videoshop_zoomlevel'          => get_option( 'videoshop_zoomlevel', 1 ),
					'videoshop_arrowcolor'         => get_option( 'videoshop_arrowcolor' ),
					'videoshop_arrowbgcolor'       => get_option( 'videoshop_arrowbgcolor' ),
					'videoshop_lic'                => $this->extend->is_videoshop_active(),
					'videoshop_aspect_ratio'       => get_option( 'videoshop_aspect_ratio' ),
				);
				
				$translation_array['videoshop_place_of_the_video'] = get_option( 'videoshop_place_of_the_video' );
				$translation_array['videoshop_videoloop']          = get_option( 'videoshop_videoloop' );
				$translation_array['videoshop_vid_autoplay']       = get_option( 'videoshop_vid_autoplay' );
				
				wp_localize_script( 'videoshop-js', 'wc_prd_vid_slider_setting', $translation_array );
				wp_enqueue_script( 'videoshop-js' );
			}
		}
	}
	public function videoshop_admin_enqueue_scripts() {
		wp_enqueue_style( 'videoshop-admin-css', plugins_url( 'css/admin-options.css', dirname(__FILE__) ), VIDEOSHOP_PLUGIN_VERSION, true );
		wp_enqueue_script( 'videoshop-admin-js', plugins_url( 'js/admin-options.js', dirname(__FILE__) ), '1.0', true );
	}
}