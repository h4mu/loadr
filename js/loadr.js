
function init() {
    WL.Event.subscribe("auth.login", onLogin);
    WL.init({
        client_id: getLiveClientID(),
        redirect_uri: getRedirect(),
        response_type: "token"
    });
    
    WL.ui({
        name: "signin",
        element: "signInButton",
        brand: "skydrive",
        type: "connect"
    });
}

function greetUser(session) {
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
}

function onLogin() {
    var session = WL.getSession();
    if (session) {
        greetUser(session);              
    }
}

$(document).ready(init);