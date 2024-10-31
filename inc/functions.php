<?php
if ( ! defined( 'ABSPATH' ) ) exit;
function videoshop_error_notice_callback_notice() {
	echo '<div class="error"><p><strong>Product Feature Video and Gallery</strong> requires WooCommerce to be installed and active. You can download <a href="https://woocommerce.com/" target="_blank">WooCommerce</a> here.</p></div>';
}
add_action( 'plugins_loaded', 'videoshop_remove_woo_hooks' );
function videoshop_remove_woo_hooks() {
	if ( ! function_exists( 'is_plugin_active_for_network' ) ) {
		require_once ABSPATH . '/wp-admin/includes/plugin.php';
	}
	if ( ( is_multisite() && is_plugin_active_for_network( 'woocommerce/woocommerce.php' ) ) || is_plugin_active( 'woocommerce/woocommerce.php' ) ) {
		new VIDEOSHOP_MAIN_CLASS();
		remove_action( 'woocommerce_before_single_product_summary_product_images', 'woocommerce_show_product_thumbnails', 20 );
		remove_action( 'woocommerce_product_thumbnails', 'woocommerce_show_product_thumbnails', 20 );
		if ( get_option( 'videoshop_hide_thumbnails' ) != 'yes' ) {
			add_action( 'woocommerce_product_thumbnails', 'videoshop_show_product_thumbnails', 20 );
		}
		if ( get_option( 'videoshop_gallery_action' ) != 'yes' ) {
			remove_action( 'woocommerce_before_single_product_summary', 'woocommerce_show_product_images', 10 );
			remove_action( 'woocommerce_before_single_product_summary', 'woocommerce_show_product_images', 20 );
			add_action( 'woocommerce_before_single_product_summary', 'videoshop_show_product_image', 10 );
		}
		add_action( 'woocommerce_before_shop_loop_item', 'videoshop_wc_template_loop_product_replaced_thumb', 10 );

		add_action('wp_head','videoshop_get_videoshop_video_schema');
	} else {
		add_action( 'admin_notices', 'videoshop_error_notice_callback_notice' );
	}
}
function videoshop_get_videoshop_video_schema()
{
	if( is_product() ){
		$product_id = get_the_ID();
		$product_video_types = get_post_meta( $product_id, '_videoshop_product_video_type', true );
		$product_video_urls  = get_post_meta( $product_id, '_videoshop_video_text_url', true );
		$video_thumb_ids     = get_post_meta( $product_id, '_videoshop_product_video_thumb_ids', true );
		$custom_thumbnails   = get_post_meta( $product_id, '_custom_thumbnail', true );
		$product_video_urls  = get_post_meta( $product_id, '_videoshop_video_text_url', true );
		$video_schemas       = get_post_meta( $product_id, '_video_schema', true );
		$video_upload_dates  = get_post_meta( $product_id, '_videoshop_video_upload_date', true );
		$video_names         = get_post_meta( $product_id, '_videoshop_video_name', true );
		$video_descriptions  = get_post_meta( $product_id, '_videoshop_video_description', true );
		if ( is_array($product_video_urls) ) {
			$extend = new VIDEOSHOP_ACTIVATE_LICENSE();
			foreach ($product_video_urls as $key => $product_video_url) {
				if( !empty( $product_video_url ) && isset($video_schemas[$key]) && $video_schemas[$key] == 'yes' && !empty( $video_names[$key] ) && !empty( $video_upload_dates[$key] ) && !empty( $video_descriptions[$key] ) ) {
					$product_video_type = $product_video_types[$key];
					$product_video_thumb_url = wc_placeholder_img_src();
					if ( ! empty( $video_thumb_ids[$key] ) ) {
						$product_video_thumb_url = wp_get_attachment_image_url( $video_thumb_ids[$key] );
					}
					if ( $product_video_type == 'videoshop_video_url_youtube' ) {
						preg_match( '/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/', $product_video_url, $matches );
						$product_video_url = 'https://www.youtube.com/embed/' . $matches[2] . '?rel=0';
					} 					
					echo '<script type="application/ld+json">
					{
					  "@context": "https://schema.org/",
					  "@type": "VideoObject",
					  "uploadDate": "' . esc_html($video_upload_dates[$key]) . '",
					  "thumbnailUrl" : "' . esc_url($product_video_thumb_url) . '",
					  "name": "' . esc_html($video_names[$key]) . '",
					  "description" : "' . esc_html($video_descriptions[$key]) . '",
					  "@id": "' . esc_url($product_video_url) . '",
					  "embedUrl" : "' . esc_url($product_video_url) . '"	  
					}
					</script>';
				}
				if(!$extend->is_videoshop_active()){
					break;
				}				
			}
		}
	}
}
function videoshop_get_videoshop_video_html( $product_video_url, $extend, $key = 1 )
{
	if ( strpos( $product_video_url, 'youtube' ) > 0 || strpos( $product_video_url, 'youtu' ) > 0 ) {
		return '<div class="tc_video_slide"><iframe id="videoshop_yt_video_'.$key.'" style="display:none;" data-skip-lazy="true" width="100%" height="100%" class="product_video_iframe" video-type="youtube" data_src="' . esc_url( $product_video_url ) . '" src="" frameborder="0" allow="autoplay; accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><span class="product_video_iframe_light videoshop-popup fa fa-expand fancybox-media" data-fancybox="product-gallery"></span></div>';
	} elseif ( strpos( $product_video_url, 'vimeo' ) > 0 && $extend->is_videoshop_active() ) {
		return '<div class="tc_video_slide"><iframe style="display:none;" data-skip-lazy="true" width="100%" height="450px" class="product_video_iframe" video-type="vimeo" src="' . esc_url( $product_video_url ) . '" frameborder="0" allow="autoplay; fullscreen" allowfullscreen=""></iframe><span href="' . esc_url( $product_video_url ) . '?enablejsapi=1&wmode=opaque" class="videoshop-popup fa fa-expand fancybox-media" data-fancybox="product-gallery"></span></div>';
	} elseif ( strpos( $product_video_url, $_SERVER['SERVER_NAME'] ) > 0 && $extend->is_videoshop_active() ) {
		return '<div class="tc_video_slide"><video width="100%" height="100%" class="product_video_iframe" video-type="html5" ' . ( ( get_option( 'videoshop_controls' ) == 'yes' ) ? 'controls' : '' ) . ' ' . ( ( get_option( 'videoshop_vid_autoplay' ) == 'yes' && get_option( 'videoshop_place_of_the_video' ) == 'yes' ) ? 'autoplay muted' : '' ) . ' playsinline><source src="' . esc_url( $product_video_url ) . '"><p>Your browser does not support HTML5</p></video><span href="' . esc_url( $product_video_url ) . '?enablejsapi=1&wmode=opaque" class="videoshop-popup fa fa-expand fancybox-media" data-fancybox="product-gallery"></span></div>';
	} elseif ( $extend->is_videoshop_active() ) {
		return '<div class="tc_video_slide"><iframe style="display:none;" data-skip-lazy="true" width="100%" height="450px" class="product_video_iframe" video-type="iframe" src="' . esc_url( $product_video_url ) . '" frameborder="0" allow="autoplay; fullscreen" allowfullscreen=""></iframe></div>';
	} else {
		return '<div class="tc_video_slide"><iframe style="display:none;" data-skip-lazy="true" width="100%" height="100%" class="product_video_iframe" video-type="youtube" data_src="' . esc_url( $product_video_url ) . '" src="" frameborder="0" allow="autoplay; accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>';
	}
}


function videoshop_show_product_image($call_type = 'action') {
	global $post, $product, $woocommerce;
	if ( $call_type != 'action' || !$product->is_type( 'gift-card' ) ) {
		$show_thumb = 0;
		$product_video_urls = get_post_meta( get_the_ID(), '_videoshop_video_text_url', true );
		$extend = new VIDEOSHOP_ACTIVATE_LICENSE();
		echo '<div class="images videoshop_product_images_with_video loading '.(( get_option( 'videoshop_show_lightbox' ) == 'yes' ) ? 'show_lightbox' : '').'">';
		if(wp_is_mobile()){
			echo '<span class="videoshop-popup_trigger fa fa-expand"></span>';
		}
		echo '<div class="slider videoshop-slider-for '.get_option( 'videoshop_slider_responsive', 'no' ).'">';
		if ( has_post_thumbnail() || ! empty( $product_video_urls[0] ) ) {
			$attachment_ids    = ($product) ? $product->get_gallery_image_ids() : '';
			$imgfull_src       = get_the_post_thumbnail_url(get_the_ID(),'full');
			$htmlvideo         = '';
			if ( ! empty( $product_video_urls ) ) {
				if ( is_array($product_video_urls) ) {
					foreach ( $product_video_urls as $key => $product_video_url) {
						if( !empty( $product_video_url ) ) {
							$show_thumb++;
							$htmlvideo .= videoshop_get_videoshop_video_html($product_video_url,$extend,$key);
						}
						if(!$extend->is_videoshop_active()){
							break;
						}
					}
				}
				else{
					$show_thumb++;
					$htmlvideo .= videoshop_get_videoshop_video_html($product_video_urls,$extend);
				}
			}
			$product_image = get_the_post_thumbnail( $post->ID, 'woocommerce_single', array( 'data-skip-lazy' => 'true', 'data-zoom-image' => $imgfull_src ) );
			$html = '';
			if( get_option( 'videoshop_show_only_video' ) == 'yes' && $extend->is_videoshop_active() ){
				$html .= $htmlvideo;
			} else {
				$html .= ( ( get_option( 'videoshop_place_of_the_video' ) == 'yes' && $extend->is_videoshop_active() ) ? $htmlvideo : '' );
				if( !empty ( $product_image ) ){
					$show_thumb++;
					$html .= sprintf( '<div class="zoom woocommerce-product-gallery__image">%s<span href="%s" class="videoshop-popup fa fa-expand" data-fancybox="product-gallery"></span></div>', $product_image, $imgfull_src );
				}
				$html .= ( ( get_option( 'videoshop_place_of_the_video' ) == 'second' && $extend->is_videoshop_active() ) ? $htmlvideo : '' );
				foreach ( $attachment_ids as $attachment_id ) {
					$show_thumb++;
					$imgfull_src = wp_get_attachment_image_url( $attachment_id, 'full' );
					$html       .= '<div class="zoom">' . wp_get_attachment_image( $attachment_id, 'woocommerce_single', 0, array( 'data-skip-lazy' => 'true', 'data-zoom-image' => $imgfull_src ) ) . '<span href="' . esc_url( $imgfull_src ) . '" class="videoshop-popup fa fa-expand" data-fancybox="product-gallery"></span></div>';
				}
				$html .= ( ( get_option( 'videoshop_place_of_the_video' ) == 'no' && get_option( 'videoshop_place_of_the_video' ) != 'yes' &&  get_option( 'videoshop_place_of_the_video' ) != 'second' || ! $extend->is_videoshop_active() ) ? $htmlvideo : '' );
			}
			echo apply_filters( 'woocommerce_single_product_image_html', $html, $post->ID );
		} else {
			echo apply_filters( 'woocommerce_single_product_image_html', sprintf( '<div class="zoom woocommerce-product-gallery__image"><img class="attachment-woocommerce_single size-woocommerce_single wp-post-image" data-skip-lazy="true" src="%s" data-zoom-image="%s" alt="%s" /></div>', wc_placeholder_img_src(), wc_placeholder_img_src(), __( 'Placeholder', 'woocommerce' ) ), $post->ID );
		}
		echo '</div>';
		if( $show_thumb > 1 || get_option('videoshop_hide_thumbnail') != 'yes' ){
			do_action( 'woocommerce_product_thumbnails' );
		}
		echo '</div>';
	} else {
		woocommerce_show_product_images();
	}
}
function videoshop_get_video_thumbanil_html( $post, $thumbnail_size) {
	$gallery_thumbnail_size = wc_get_image_size( $thumbnail_size );
	$product_video_urls = get_post_meta( get_the_ID(), '_videoshop_video_text_url', true );
	$wc_placeholder_img = wc_placeholder_img_src();
	if ( ! empty( $product_video_urls ) ) {
		$product_video_thumb_ids  = get_post_meta( get_the_ID(), '_videoshop_product_video_thumb_ids', true );
		$custom_thumbnails        = get_post_meta( get_the_ID(), '_custom_thumbnail', true );
		if ( is_array($product_video_urls) ) {
			$extend = new VIDEOSHOP_ACTIVATE_LICENSE();
			foreach ($product_video_urls as $key => $product_video_url) {
				if( !empty( $product_video_url ) ) {
					$product_video_thumb_id   = isset($product_video_thumb_ids[$key]) ? $product_video_thumb_ids[$key] : '';
					$custom_thumbnail        = isset($custom_thumbnails[$key]) && !empty($product_video_thumb_id) ? 'custom_thumbnail="'.$custom_thumbnails[$key].'"' : '';
					$product_video_thumb_url = $wc_placeholder_img;
					$global_thumb = '';
					if ( $product_video_thumb_id ) {
						$product_video_thumb_url = wp_get_attachment_image_url( $product_video_thumb_id, $thumbnail_size );
					} elseif ($custom_icon = get_option( 'custom_icon' ) ) {
						$custom_thumbnail        = 'custom_thumbnail="yes"';
						if(is_numeric($custom_icon)){
							$product_video_thumb_url = wp_get_attachment_image_url( get_option( 'custom_icon' ), $thumbnail_size );
						} else {
							$product_video_thumb_url = $custom_icon;
						}
						$global_thumb = 'global-thumb="' . esc_url( $product_video_thumb_url ).'"';
					}
					echo apply_filters( 'woocommerce_single_product_image_thumbnail_html', '<li title="video" class="video-thumbnail"><div class="video_icon_img" style="background: url( ' . VIDEOSHOP_URL. 'css/video-icon.svg' . ' ) no-repeat;"></div><img width="' . $gallery_thumbnail_size['width'] . '" height="' . $gallery_thumbnail_size['height'] . '" data-skip-lazy="true" ' . $global_thumb . ' src="' . esc_url( $product_video_thumb_url ) . '" ' . $custom_thumbnail . ' class="product_video_img img_'.$key.' attachment-thumbnail size-thumbnail" alt="video-thumb-'.$key.'"></li>', '', $post->ID );
					if(!$extend->is_videoshop_active()){
						break;
					}
				}
			}
		}
		else{
			$product_video_thumb_urls = $wc_placeholder_img;
			$global_thumb = '';
			if ( $product_video_thumb_ids ) {
				$product_video_thumb_urls = wp_get_attachment_image_url( $product_video_thumb_ids, $thumbnail_size );
			} elseif ($custom_icon = get_option( 'custom_icon' ) ) {
				$custom_thumbnails        = 'custom_thumbnail="yes"';
				if(is_numeric($custom_icon)){
					$product_video_thumb_url = wp_get_attachment_image_url( get_option( 'custom_icon' ), $thumbnail_size );
				} else {
					$product_video_thumb_url = $custom_icon;
				}
				$global_thumb = 'global-thumb=" ' . esc_url( $product_video_thumb_urls ).' "';
			}
			echo apply_filters( 'woocommerce_single_product_image_thumbnail_html', '<li title="video" class="video-thumbnail"><div class="video_icon_img" style="background: url( ' . VIDEOSHOP_URL. 'css/video-icon.svg' . ' ) no-repeat;"></div><img width="' . $gallery_thumbnail_size['width'] . '" height="' . $gallery_thumbnail_size['height'] . '" data-skip-lazy="true" ' . $global_thumb . ' src="' . esc_url( $product_video_thumb_urls ) . '" ' . $custom_thumbnails . ' class="product_video_img img_0 attachment-thumbnail size-thumbnail" alt="video-thumb-0"></li>', '', $post->ID );
		}
	} else {
		return;
	}
}
function videoshop_show_product_thumbnails() {
	global $post, $product, $woocommerce;
	if (empty($product->get_type()) || !$product->is_type( 'gift-card' ) ) {
		$extend         = new VIDEOSHOP_ACTIVATE_LICENSE();
		$attachment_ids = $product->get_gallery_image_ids();
		if ( has_post_thumbnail() ) {
			$thumbanil_id   = array( get_post_thumbnail_id() );
			$attachment_ids = array_merge( $thumbanil_id, $attachment_ids );
		}
		$thumbnail_size    = apply_filters( 'woocommerce_gallery_thumbnail_size', 'woocommerce_gallery_thumbnail' );
		if ( ( $attachment_ids && $product->get_image_id() ) || ! empty( get_post_meta( get_the_ID(), '_videoshop_video_text_url', true ) ) ) {
			echo '<div id="videoshop-gallery" class="slider videoshop-slider-nav">';
			if( ( get_option( 'videoshop_show_only_video' ) == 'yes' && $extend->is_videoshop_active() ) || empty( $attachment_ids )){
				videoshop_get_video_thumbanil_html( $post, $thumbnail_size );
			} else {
				if ( ( get_option( 'videoshop_place_of_the_video' ) == 'yes' || empty( $thumbanil_id[0] ) ) && $extend->is_videoshop_active() ) {
					videoshop_get_video_thumbanil_html( $post, $thumbnail_size );
				}
				foreach ( $attachment_ids as $attachment_id ) {
					$props = wc_get_product_attachment_props( $attachment_id, $post );
					if ( ! $props['url'] ) {
						continue;
					}
					echo apply_filters( 'woocommerce_single_product_image_thumbnail_html', sprintf( '<li class="product_thumbnail_item ' . ( ( !empty( $thumbanil_id[0] ) && $thumbanil_id[0] == $attachment_id ) ? 'wp-post-image-thumb' : '' ) . '" title="%s">%s</li>', esc_attr( $props['caption'] ), wp_get_attachment_image( $attachment_id, $thumbnail_size, 0, array( 'data-skip-lazy' => 'true' ) ) ), $attachment_id );
					if ( !empty( $thumbanil_id[0] ) && $thumbanil_id[0] == $attachment_id && get_option( 'videoshop_place_of_the_video' ) == 'second' && $extend->is_videoshop_active() ) {
						videoshop_get_video_thumbanil_html( $post, $thumbnail_size );
					}
				}
				if ( get_option( 'videoshop_place_of_the_video' ) == 'no' && get_option( 'videoshop_place_of_the_video' ) != 'yes' && get_option( 'videoshop_place_of_the_video' ) != 'second' || ! $extend->is_videoshop_active() ) {
					videoshop_get_video_thumbanil_html( $post, $thumbnail_size );
				}
			}
			echo '</div>';
		}
	} else {
		woocommerce_show_product_thumbnails();
	}
}


function videoshop_wc_template_loop_product_replaced_thumb() {
			
	add_filter('woocommerce_product_get_image' , function( $image = '' ) {
		$image_st = '';
		$image_en = '';
		$image_st = '<div class="woocommerce-product-gallery videoshop-shop" >';
		$image_en = '</div>';
		global $product;
		$product_video_urls = get_post_meta( $product->get_id(), '_videoshop_video_text_url', true );
		$htmlvideo         = '';
		if (! empty( $product_video_urls[0] ) && get_option( 'videoshop_on_shop_page' ) == 'yes') {
			if ( ! empty( $product_video_urls ) ) {
				if ( is_array($product_video_urls) ) {
					foreach ( $product_video_urls as $key => $product_video_url) {
						if( !empty( $product_video_url ) ) {
							$htmlvideo .= videoshop_get_archive_video_html($product_video_url);
						}
						break;
					}
				}
				else{
					$htmlvideo .= videoshop_get_archive_video_html($product_video_urls);
				}
			}
			$image = $htmlvideo;
			return $image_st . $image . $image_en;
		} else {
			return $image;
		}
	});
}
function videoshop_get_archive_video_html( $product_video_url, $key = 1 )
{
	if ( strpos( $product_video_url, 'youtube' ) > 0 || strpos( $product_video_url, 'youtu' ) > 0 ) {
		return '<div class="videoshop_archive"><iframe id="videoshop_yt_video_'.$key.'" data-skip-lazy="true" width="100%" height="100%" class="product_video_iframe archive_video_iframe" video-type="youtube" data_src="' . esc_url( $product_video_url ) . '" src="" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><span class="product_video_iframe_light videoshop-popup fa fa-expand fancybox-media" data-fancybox="product-gallery"></span></div>';
	} elseif ( strpos( $product_video_url, 'vimeo' ) > 0 ) {
		return '<div class="videoshop_archive"><iframe data-skip-lazy="true" width="100%" height="100%" class="product_video_iframe archive_video_iframe" video-type="vimeo" src="' . esc_url( $product_video_url ) . '?loop=0&title=0&portrait=0&byline=0&dnt=0&color&autopause=0&autoplay=0" frameborder="0" allow="fullscreen"></iframe><span href="' . esc_url( $product_video_url ) . '?enablejsapi=1&wmode=opaque" class="videoshop-popup fa fa-expand fancybox-media" data-fancybox="product-gallery"></span></div>';
	} elseif ( strpos( $product_video_url, $_SERVER['SERVER_NAME'] ) > 0 ) {
		return '<div class="videoshop_archive"><video width="100%" height="100%" class="product_video_iframe archive_video_iframe" video-type="html5" ' . ( ( get_option( 'videoshop_controls' ) == 'yes' ) ? 'controls' : '' ) . ' playsinline><source src="' . esc_url( $product_video_url ) . '"><p>Your browser does not support HTML5</p></video><span href="' . esc_url( $product_video_url ) . '?enablejsapi=1&wmode=opaque" class="videoshop-popup fa fa-expand fancybox-media" data-fancybox="product-gallery"></span></div>';
	} else {
		return '<div class="videoshop_archive"><iframe data-skip-lazy="true" width="100%" height="100%" class="product_video_iframe archive_video_iframe" video-type="youtube" data_src="' . esc_url( $product_video_url ) . '" src="" frameborder="0" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>';
	}
}

// add_filter( 'plugin_action_links_videoshop/videoshop.php', 'videoshop_settings_link' );
// function videoshop_settings_link( $links ) {
// 	// Build and escape the URL.
// 	$url = get_admin_url() . "edit.php?post_type=product&page=wc-videoshop";
//     $settings_link = '<a href="' . $url . '">' . __('Settings', 'videoshop') . '</a>';
//       $links[] = $settings_link;
//     return $links;
// 	return $links;
// }