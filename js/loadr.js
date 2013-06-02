
function init() {
    WL.Event.subscribe("auth.login", onLogin);
    WL.init({
        client_id: getLiveClientID(),
        redirect_uri: getRedirect(),
        response_type: "token",
        scope: ["wl.skydrive", "wl.photos"]
    });
    
    WL.ui({
        name: "signin",
        element: "signInButton",
        brand: "skydrive",
        type: "connect"
    });
}

function greetUser() {
    var strGreeting = "";
    WL.api(
    {
        path: "me",
        method: "GET"
    },
    function (response) {
        if (!response.error) {
            strGreeting = "Hi, " + response.first_name + "!"
            document.getElementById("greeting").innerHTML = strGreeting;
        }
    });
    WL.api({
        path: "/me/skydrive/files?filter=albums,photos",
        method: "GET"
    },
    function(response) {
        if (!response.error) {
            console.log(response);
            WL.api({
                path: "/" + response.data[0].id + "/files?filter=albums,photos",
                method: "GET"
            },
            function(response2) {
                if (!response2.error) {
                    console.log(response2);
                }
            });
        }
    });
}

// function requestToken() {
//     var host = 'http://www.flickr.com/services',
//     oauth_secret = '';
    
//     var o = {
//         oauth_version: 1.0,
//         oauth_consumer_key: '',
//         oauth_signature_method: 'HMAC-SHA1',
//         oauth_timestamp: ohauth.timestamp(),
//         oauth_nonce: ohauth.nonce(),
//         oauth_callback: 'https://c9.io/h4mu/loadr/workspace/flickr.html'
//     };
    
//     var url = host + '/oauth/request_token';
//     o.oauth_signature = ohauth.signature(oauth_secret, '', ohauth.baseString('POST', url, o));
//     $.ajax({
//         url: url,
//         data: o
//     }).done(function (response) {
//         console.log(response);
//     });
//     // ohauth.xhr('POST', url, o, null, {}, function(xhr) {
//     // var token = ohauth.stringQs(xhr.response);
//     // document.cookie = 'ohauth_token_secret=' + token.oauth_token_secret;
//     // var at = host + '/oauth/authorize?';
//     // ifr.src = at + ohauth.qsString({
//     // oauth_token: token.oauth_token,
//     // oauth_callback: location.href
//     // });
//     // });
// }

// function createFlickrSignature(method, url, message) {
//     var props = [];
//     for (var propName in message) {
//         props.push(propName);
//     }
//     props = props.sort();
//     var components = [method, encodeURIComponent(url)];
//     for (var i = 0; i < props.length; i++) {
//         components.push(encodeURIComponent(props[i] + '=' + message[props[i]]));
//     }
//     return CryptoJS.HmacSHA1(components.join('&'), "Secret Passphrase");
// }

function onLogin() {
    // var session = WL.getSession();
    // if (session) {
    greetUser();
    // }
}

$(document).ready(init);