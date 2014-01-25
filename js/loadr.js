
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

function downloadFile_fileDialog() {
    WL.fileDialog({
        mode: "open",
        select: "multi"
    }).then(
        function (response) {
            var msg = "";
            // For each folder selected...
            if (response.data.folders.length > 0) {
                for (folder = 0; folder < response.data.folders.length; folder++) {
                    // Use folder IDs to iterate through child folders and files as needed.
                    msg += "\n" + response.data.folders[folder].id;
                }
            }
            // For each file selected...
            // if (response.data.files.length > 0) {
            //     for (file = 0; file < response.data.files.length; file++) {
            //         // Use file IDs to iterate through files as needed.
            //         msg += "\n" + response.data.files[file].id;                            
            //     }
            // }
            document.getElementById("info").innerText =
                "Selected folders/files:" + msg;
        },
        function (responseFailed) {
            document.getElementById("info").innerText =
                "Error getting folder/file info: " + responseFailed.error.message;
        }
    );
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