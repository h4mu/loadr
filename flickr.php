<?php
require_once ('OAuth.php');
require_once ('apidata.php');
require_once ('util.php');

$request_token_endpoint = "http://www.flickr.com/services/oauth/request_token?oauth_callback=$base_url/callback.php";
$authorize_endpoint = 'http://www.flickr.com/services/oauth/authorize';

$consumer = new OAuthConsumer($key, $secret, NULL);

//prepare to get request token
$sig_method = new OAuthSignatureMethod_HMAC_SHA1();
$parsed = parse_url($request_token_endpoint);
parse_str($parsed['query'], $params);

$req_req = OAuthRequest::from_consumer_and_token($consumer, NULL, 'GET', $request_token_endpoint, $params);
$req_req->sign_request($sig_method, $consumer, NULL);

$req_token = doHttpRequest ($req_req->to_url());

//assuming the req token fetch was a success, we should have
//oauth_token and oauth_token_secret
parse_str ($req_token,$tokens);

$oauth_token = $tokens['oauth_token'];
$oauth_token_secret = $tokens['oauth_token_secret'];

setcookie('token_secret', $oauth_token_secret, time() + 3600);

$auth_url = $authorize_endpoint . "?perms=write&oauth_token=$oauth_token";

Header("Location: $auth_url");
?>