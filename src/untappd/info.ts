/// <reference path="../untappd.ts" />

module Untappd {
    export module Info {
        var METHOD_GET_BREWERY: string = "/v4/brewery/info/";
        var METHOD_GET_BEER: string = "/v4/beer/info/";
        var METHOD_GET_VENUE: string = "/v4/venue/info/";
        var METHOD_GET_CHECKIN: string = "/v4/checkin/view/";

        export function brewery(id: string, compact: boolean = true): JQueryPromise<Brewery> {
            return API.sendRequest(METHOD_GET_BREWERY, id, "brewery", {compact: compact});
        }

        export function beer(id: string, compact: boolean = true): JQueryPromise<Beer> {
            return API.sendRequest(METHOD_GET_BEER, id, "beer", {compact: compact});
        }

        export function venue(id: string, compact: boolean = true): JQueryPromise<Venue> {
            return API.sendRequest(METHOD_GET_VENUE, id, "venue", {compact: compact});
        }

        export function checkin(id: string): JQueryPromise<CheckIn> {
            return API.sendRequest(METHOD_GET_CHECKIN, id, "checkin");
        }
    }
}
