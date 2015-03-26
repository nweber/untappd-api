/// <reference path="untappd/valueobjects/valueobjects.ts" />
/// <reference path="untappd/constants.ts" />
/// <reference path="untappd/info.ts" />
/// <reference path="untappd/authentication.ts" />
/// <reference path="untappd/feeds.ts" />
/// <reference path="untappd/user.ts" />
/// <reference path="untappd/search.ts" />
/// <reference path="untappd/checkins.ts" />
/// <reference path="untappd/wishlist.ts" />
/// <reference path="untappd/friends.ts" />
/// <reference path="untappd/notifications.ts" />

module Untappd {
    export module API {
        export var endpoint: string = "https://api.untappd.com";

        export var appId: string;
        export var appSecret: string;

        export var authenticated:boolean = false;
        export var accessToken: string;

        export function initialize(id: string, secret: string): JQueryPromise<void> {
            appId = id;
            appSecret = secret;
            return Authentication.start();
        }

        export function getMethodUrl(method: string, value: string, properties: Object): string {
            var prop: string;
            var u: string = endpoint;
            u += method;
            if (value !== undefined) u += value;
            u += "?";

            // use the access token if we have one to avoid rate limits
            if (authenticated && accessToken) {
                u += "access_token=";
                u += accessToken;
            }
            else {
                u += "client_id=";
                u += appId;
                u += "&";
                u += "client_secret=";
                u += appSecret;
            }

            if (properties !== undefined) {
                for (prop in properties) {
                    if (properties.hasOwnProperty(prop)) {
                        u += "&";
                        u += prop;
                        u += "=";
                        u += properties[prop];
                    }
                }
            }

            return u;
        }

        export function sendRequest(method: string, value: string, propertyName: string = undefined, properties: Object = {compact: true}): JQueryPromise<any> {
            var deferred: JQueryDeferred<any> = $.Deferred<any>();

            var url: string = getMethodUrl(method, value, properties);
            $.ajax({url: url}).done((data: Object) => {
                // TODO : Catch errors.
                // TODO : Do we care about the notifications property?

                // the property with the actual data in it
                var responseName: string = "response";

                var result: any = data[responseName];

                if (propertyName) {
                    result = result[propertyName];
                }

                deferred.resolve(result);
            });

            return deferred.promise();
        }
    }
}
