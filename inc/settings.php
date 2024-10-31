<?php
if ( ! defined( 'ABSPATH' ) ) exit;
ob_start();
class VIDEOSHOP_ACTIVATE_LICENSE {
	public $err;
	private $wp_option = 'videoshop_info';
	private $ck = 'ck_78dd9b92fc5487d031aaf4e84eb7c7d07cf4e74a';
    private $cs = 'cs_070a3bacf6ce4189b3d5f1491e4855df3cf60f66';
	public function is_videoshop_active() {
		$videoshop_lic = get_option( $this->wp_option );
		if ( ! empty( $videoshop_lic ) ) {
			$var_res  = unserialize( base64_decode( $videoshop_lic ) );
			$site_url = preg_replace( '#^[^:/.]*[:/]+#i', '', get_site_url() );
			if ( $var_res['rd'] == $site_url ) {
				return true;
			}else{
			    return false;
			}
		} else {
			return false;
		}
	}
	public function videoshop_activate( $videoshop_lic ) {
		return $this->videoshop_start_activating( $videoshop_lic );
	}
	public function videoshop_start_activating( $key ) {
        $domain = preg_replace( '#^[^:/.]*[:/]+#i', '', get_site_url() );
        $plugin_name = VIDEOSHOP_PLUGIN_NAME;

		$url = "https://wpapplab.com/wp-json/lmfwc/v2/licenses/activate/{$key}?consumer_key={$this->ck}&consumer_secret={$this->cs}";
		$json_response = wp_remote_get($url);
		$response = json_decode(wp_remote_retrieve_body($json_response), true);

        if (isset($response['success'])) {
            $videoshop_key = base64_encode( serialize( array( 'l' => $key, 'rd' => $domain, 'pn' => $plugin_name ) ));
            update_option( $this->wp_option, $videoshop_key );
            return true;
        } elseif(!empty($response) && array_key_exists("message",$response)) {
            $this->err = $response['message'];
            delete_option( $this->wp_option );
            return false;
        }
	}
	public function videoshop_deactivate() {
		$videoshop_lic = get_option( $this->wp_option );
		$videoshop_lic = unserialize( base64_decode( $videoshop_lic ) );
		$key = $videoshop_lic['l'];
		$domain = preg_replace( '#^[^:/.]*[:/]+#i', '', get_site_url() );
        $plugin_name = VIDEOSHOP_PLUGIN_NAME;
		$url = "https://wpapplab.com/wp-json/lmfwc/v2/licenses/deactivate/{$key}?consumer_key={$this->ck}&consumer_secret={$this->cs}";
		$json_response = wp_remote_get($url);
		$response = json_decode(wp_remote_retrieve_body($json_response), true);

        if (!empty($response['success']) && array_key_exists("success",$response)) {
            delete_option( $this->wp_option );
            return true;
        } elseif(!empty($response) && array_key_exists("message",$response)) {
            $this->err = $response['message'];
            return false;
        }
	}
}
