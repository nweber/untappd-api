/// <reference path="../untappd.ts" />
var Untappd;
(function (Untappd) {
    var Authentication;
    (function (Authentication) {
        var REDIRECT_URL = "http://localhost/~nweber/untappd-api/index.html";
        var OATH_ENDPOINT = "https://untappd.com/oauth/authenticate/";
        var AUTHORIZE_ENDPOINT = "https://untappd.com/oauth/authorize/";
        var ACCESS_TOKEN_COOKIE = "untappdAccessToken";
        function logout() {
            Untappd.API.authenticated = false;
            Untappd.API.accessToken = null;
            $.removeCookie(ACCESS_TOKEN_COOKIE);
        }
        Authentication.logout = logout;
        function login() {
            var u = OATH_ENDPOINT;
            u += "?";
            u += "client_id=";
            u += Untappd.API.appId;
            u += "&";
            u += "response_type=";
            u += "code";
            u += "&";
            u += "redirect_url=";
            u += REDIRECT_URL;
            window.location.href = u;
        }
        Authentication.login = login;
        // todo - move this somewhere or something
        function urlParam(name) {
            var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
            if (results == null) {
                return null;
            }
            else {
                return results[1] || null;
            }
        }
        function authorize(code) {
            var deferred = $.Deferred();
            var u = AUTHORIZE_ENDPOINT;
            u += "?";
            u += "client_id=";
            u += Untappd.API.appId;
            u += "&";
            u += "client_secret=";
            u += Untappd.API.appSecret;
            u += "&";
            u += "response_type=";
            u += "code";
            u += "&";
            u += "redirect_url=";
            u += REDIRECT_URL;
            u += "&";
            u += "code=";
            u += code;
            console.log("Sending authorization request...");
            console.log(u);
            $.ajax({ url: u }).done(function (result) {
                console.log("Authorize finished.");
                console.log(result);
                if (result.meta.http_code != 200) {
                    deferred.reject(result.meta.error_detail);
                }
                else {
                    Untappd.API.accessToken = result.response.access_token;
                    Untappd.API.authenticated = true;
                    console.log("User logged in!");
                    console.log("Saving access token to a cookie...");
                    $.cookie(ACCESS_TOKEN_COOKIE, Untappd.API.accessToken);
                    deferred.resolve();
                }
            });
            return deferred.promise();
        }
        /**
         * Checks to see if the Untappd API has redirected to us with an authorization code.
         */
        function checkCode() {
            var code = urlParam("code");
            if (code) {
                console.log("An authentication code was passed in, so finish up the process.");
                return authorize(code);
            }
            else {
                // todo : way to just return an already done, empty promise?
                var deferred = $.Deferred();
                deferred.resolve();
                return deferred.promise();
            }
        }
        /**
         * Checks to see if we have a saved access token in cookies.
         */
        function checkCookie() {
            console.log("Checking for access token in cookies.");
            var cookie = $.cookie(ACCESS_TOKEN_COOKIE);
            if (cookie) {
                console.log("We have an access token!");
                Untappd.API.authenticated = true;
                Untappd.API.accessToken = cookie;
            }
            else {
                console.log("No access token found.");
                Untappd.API.authenticated = false;
            }
        }
        function start() {
            checkCookie(); // sync
            return checkCode(); // async
        }
        Authentication.start = start;
    })(Authentication = Untappd.Authentication || (Untappd.Authentication = {}));
})(Untappd || (Untappd = {}));
//# sourceMappingURL=authentication.js.map