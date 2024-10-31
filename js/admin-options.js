jQuery(document).ready(function (e) {
    jQuery(".colorpick").each(function (w) {
        jQuery(this).wpColorPicker();
    });
    jQuery("div.techno_main_tabs").click(function (e) {
        jQuery(".techno_main_tabs").removeClass("active");
        jQuery(this).addClass("active");
        jQuery(".videoshop_tabs").hide();
        jQuery("." + this.id).show();
    });
    jQuery("tr.primium_aria").click(function (e) {
        jQuery("#tab_premium").trigger("click");
    });
    jQuery(".upload_image_button").click(function (e) {
        var send_attachment_bkp = wp.media.editor.send.attachment;
        wp.media.editor.send.attachment = function (props, attachment) {
            jQuery("#custom_icon").val(attachment.id);
            jQuery("#custom_video_thumb").attr("src", attachment.url).show();
            wp.media.editor.send.attachment = send_attachment_bkp;
        }
        wp.media.editor.open(this);
        return false;
    });
    jQuery(".remove_image_button").click(function (e) {
        var answer = confirm("Are you sure?");
        if (answer == true) {
            jQuery("#custom_icon").val("");
            jQuery("#custom_video_thumb").attr("src", "").hide();
        }
        return false;
    });
});

jQuery(document).ready(function ($) {
    $(document).on('change', 'select[name^="videoshop_product_video_type["]', function (e) {
        set_video_type(this);
    });
    $(document).on('change', 'input[name^="videoshop_video_text_url["]', function (e) {
        let video_url = this.value;
        let video_aria = $(this).parents('.video_url_aria');
        if (video_url.indexOf("youtu") > 0) {
            video_aria.find('select[name^="videoshop_product_video_type["]').val('videoshop_video_url_youtube').change();
        } else if (video_url.indexOf("vimeo") > 0) {
            video_aria.find('select[name^="videoshop_product_video_type["]').val('videoshop_video_url_vimeo').change();
        } else if (video_url.indexOf(window.location.hostname) > 0) {
            video_aria.find('select[name^="videoshop_product_video_type["]').val('videoshop_video_url_local').change();
        } else {
            video_aria.find('select[name^="videoshop_product_video_type["]').val('videoshop_video_url_iframe').change();
        }
    });
    $(document).on('change', 'input.custom_thumbnail', function (e) {
        let video_aria = $(this).parents('.video_url_aria');
        if (this.checked) {
            video_aria.find(".select_video_thumbnail").show();
            video_aria.find('input[name^="custom_thumbnail["]').val('yes');
        } else {
            video_aria.find('input[name^="custom_thumbnail["]').val('no');
            video_aria.find(".select_video_thumbnail").hide();
        }
    });
    $(document).on('change', 'input.video_schema', function (e) {
        let video_aria = $(this).parents('.video_url_aria');
        if (this.checked) {
            video_aria.find(".select_video_schema").show();
            video_aria.find('input[name^="video_schema["]').val('yes');
        } else {
            video_aria.find(".select_video_schema").hide();
            video_aria.find('input[name^="video_schema["]').val('no');
        }
    });
    $('select[name^="videoshop_product_video_type["]').each(function (e) {
        set_video_type(this);
    });
    $(document).on('click', '.select_video_button', function (e) {
        let video_aria = $(this).parents('.video_url_aria');
        videoshop_video_uploader = wp.media({ library: { type: "video" }, title: "Select Video" });
        videoshop_video_uploader.on("select", function (e) {
            var file = videoshop_video_uploader.state().get("selection").first();
            var extension = file.changed.subtype;
            var video_url = file.changed.url;
            video_aria.find(".videoshop_video_text_urls").val(video_url);
        });
        videoshop_video_uploader.open();
    });
    $(document).on('click', '.select_video_thumb_button', function (e) {
        let video_aria = $(this).parents('.video_url_aria');
        videoshop_video_thumb_uploader = wp.media({ library: { type: "image" }, title: "Select Video Thumbnail" });
        videoshop_video_thumb_uploader.on("select", function (e) {
            var file = videoshop_video_thumb_uploader.state().get("selection").first();
            var id = file.attributes.id;
            var video_thumb_url = file.changed.url;
            video_aria.find(".product_video_thumb").attr("src", video_thumb_url).show();
            video_aria.find(".product_video_thumb_url").val(id);
        });
        videoshop_video_thumb_uploader.open();
    });
    $(document).on('click', '.remove_image_button', function (e) {
        let video_aria = $(this).parents('.video_url_aria');
        video_aria.find(".product_video_thumb").attr("src", "").hide();
        video_aria.find(".product_video_thumb_url").val("");
        return false;
    });
    $(document).on('click', '.product_videos_tbl b.button.video-remove-btn', function (e) {
        $(this).parents('tr').remove();
    });
    $(document).on('click', '.product_videos_tbl .add_video', function (e) {
        const html = '<tr><td colspan="2"><div class="video_url_aria"><div><label class="videoshop_lbl videoshop_product_video_type_lbl" for="videoshop_product_video_type">Video Type</label><select name="videoshop_product_video_type[]" class="videoshop_input"><option value="videoshop_video_url_youtube">Youtube Video</option><option value="videoshop_video_url_vimeo">Vimeo Video</option><option value="videoshop_video_url_local">Self Hosted Video(MP4, WebM, and Ogg)</option><option value="videoshop_video_url_iframe">Other (embedUrl)</option></select></div><div style="display: inline-block;"><div style="display: inline-block; vertical-align: top;"><label class="videoshop_lbl" for="videoshop_video_text_urls">Video Url</label></div><div style="display: inline-block;"><div><input type="url" class="videoshop_input videoshop_video_text_urls" name="videoshop_video_text_url[]" placeholder="URL of your video"><span><label style="display: none;" class="select_video_button button">Select Video</label><input type="hidden" name="video_attachment_id" id="video_attachment_id"></span></div><div><small style="display: none;" class="videoshop_url_info videoshop_video_url_youtube">https://www.youtube.com/embed/.....</small><small style="display: none;" class="videoshop_url_info videoshop_video_url_vimeo">https://player.vimeo.com/video/......</small><small style="display: none;" class="videoshop_url_info videoshop_video_url_local">./wp-content/upload/......</small><small style="display: none;" class="videoshop_url_info videoshop_video_url_iframe">Your embed video url.</small></div></div></div><div><div><input type="checkbox" class="custom_thumbnail" value="yes"><input type="hidden" value="no" name="custom_thumbnail[]"><label class="videoshop_tab" for="custom_thumbnail">Use Custom video Thumbnail?</label></div><div class="select_video_thumbnail" style="display:none;"><div class="video_thumbnail_aria"><img style="max-width:80px;max-height:80px;" class="product_video_thumb"></div><div class="video_thumbnail_btn"><label class="select_video_thumb_button button">Select Video Thumbnail</label><input type="hidden" name="product_video_thumb_url[]" class="product_video_thumb_url"><lable type="submit" class="remove_image_button button">X</lable></div></div></div></div><div class="video_delete_aria"><b class="button video-remove-btn" title="Remove Video"><span class="dashicons dashicons-remove"></span></b></div></td></tr>';
        $('.product_videos_tbl tbody').append(html);
    });
    function set_video_type(video) {
        let video_type = video.value;
        let video_aria = jQuery(video).parents('.video_url_aria');
        video_aria.find(".videoshop_url_info,.select_video_button").hide();
        video_aria.find("." + video_type).show();
        video_aria.find("label.videoshop_tab").removeClass("active");
        video_aria.find("label[for=" + video_type + "]").addClass("active");
        if (video_type == "videoshop_video_url_local") {
            video_aria.find(".select_video_button").show();
        }
    }
});