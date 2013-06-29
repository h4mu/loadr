<?php
require_once ('OAuth.php');
require_once ('apidata.php');
require_once ('util.php');

$oauth_access_token_endpoint = 'http://www.flickr.com/services/oauth/access_token';

$consumer = new OAuthConsumer($key, $secret, NULL);
$auth_token = new OAuthConsumer($_REQUEST['oauth_token'], $_COOKIE['token_secret']);
setcookie('token_secret', '', time() - 3600);
$access_token_req = new OAuthRequest("GET", $oauth_access_token_endpoint);
$access_token_req = $access_token_req->from_consumer_and_token($consumer, $auth_token, "GET", $oauth_access_token_endpoint, array('oauth_verifier' => $_REQUEST['oauth_verifier']));

$access_token_req->sign_request(new OAuthSignatureMethod_HMAC_SHA1(), $consumer, $auth_token);

$after_access_request = doHttpRequest($access_token_req->to_url());
echo $after_access_request;
parse_str($after_access_request, $access_tokens);

$access_token = new OAuthConsumer($access_tokens['oauth_token'], $access_tokens['oauth_token_secret']);
?>