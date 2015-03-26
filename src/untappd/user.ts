/// <reference path="../untappd.ts" />

module Untappd {
    export module User {
        var METHOD_GET_INFO: string = "/v4/user/info/";

        export function info(id: string, compact: boolean = true): JQueryPromise<User> {
            return API.sendRequest(METHOD_GET_INFO, id, "user", {compact: compact});
        }

        export function me(compact: boolean = true): JQueryPromise<User> {
            return API.sendRequest(METHOD_GET_INFO, undefined, "user", {compact: compact});
        }
    }
}
