/// <reference path="../untappd.ts" />

module Untappd {
    export module Authentication {
        interface AuthorizeMeta {
            error_detail?: string;
            error_type?: string;
            http_code: number;
        }

        interface AuthorizeResponse {
            access_token?: string;
        }

        interface AuthorizeResult {
            meta: AuthorizeMeta;
            response: AuthorizeResponse;
        }

        var REDIRECT_URL: string = "http://localhost/~nweber/untappd-api/index.html";
        var OATH_ENDPOINT: string = "https://untappd.com/oauth/authenticate/";
        var AUTHORIZE_ENDPOINT: string = "https://untappd.com/oauth/authorize/";
        var ACCESS_TOKEN_COOKIE: string = "untappdAccessToken";

        export function logout(): void {
            Untappd.API.authenticated = false;
            Untappd.API.accessToken = null;
            $.removeCookie(ACCESS_TOKEN_COOKIE);
        }

        export function login(): void {
            var u: string = OATH_ENDPOINT;
            u += "?";
            u += "client_id=";
            u += API.appId;
            u += "&";
            u += "response_type=";
            u += "code";
            u += "&";
            u += "redirect_url=";
            u += REDIRECT_URL;

            window.location.href = u;
        }

        // todo - move this somewhere or something
        function urlParam(name: string): string {
            var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
            if (results == null){
                return null;
            }
            else{
                return results[1] || null;
            }
        }

        function authorize(code: string): JQueryPromise<void> {
            var deferred: JQueryDeferred<void> = $.Deferred<void>();

            var u: string = AUTHORIZE_ENDPOINT;
            u += "?";
            u += "client_id=";
            u += API.appId;
            u += "&";
            u += "client_secret=";
            u += API.appSecret;
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

            $.ajax({url: u}).done((result: AuthorizeResult) => {
                console.log("Authorize finished.");
                console.log(result);

                if (result.meta.http_code != 200) {
                    deferred.reject(result.meta.error_detail);
                }
                else {
                    API.accessToken = result.response.access_token;
                    API.authenticated = true;

                    console.log("User logged in!");

                    console.log("Saving access token to a cookie...");
                    $.cookie(ACCESS_TOKEN_COOKIE, API.accessToken);

                    deferred.resolve();
                }
            });

            return deferred.promise();
        }

        /**
         * Checks to see if the Untappd API has redirected to us with an authorization code.
         */
        function checkCode(): JQueryPromise<void> {
            var code: string = urlParam("code");
            if (code) {
                console.log("An authentication code was passed in, so finish up the process.");
                return authorize(code);
            }
            else {
                // todo : way to just return an already done, empty promise?
                var deferred: JQueryDeferred<void> = $.Deferred<void>();
                deferred.resolve();
                return deferred.promise();
            }
        }

        /**
         * Checks to see if we have a saved access token in cookies.
         */
        function checkCookie(): void {
            console.log("Checking for access token in cookies.");
            var cookie: string = $.cookie(ACCESS_TOKEN_COOKIE);
            if (cookie) {
                console.log("We have an access token!");
                API.authenticated = true;
                API.accessToken = cookie;
            }
            else {
                console.log("No access token found.");
                API.authenticated = false;
            }
        }

        export function start(): JQueryPromise<void> {
            checkCookie(); // sync
            return checkCode(); // async
        }
    }
}
