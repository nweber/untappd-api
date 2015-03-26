/// <reference path="../untappd.ts" />
var Untappd;
(function (Untappd) {
    var Info;
    (function (Info) {
        var METHOD_GET_BREWERY = "/v4/brewery/info/";
        var METHOD_GET_BEER = "/v4/beer/info/";
        var METHOD_GET_VENUE = "/v4/venue/info/";
        var METHOD_GET_CHECKIN = "/v4/checkin/view/";
        function brewery(id, compact) {
            if (compact === void 0) { compact = true; }
            return Untappd.API.sendRequest(METHOD_GET_BREWERY, id, "brewery", { compact: compact });
        }
        Info.brewery = brewery;
        function beer(id, compact) {
            if (compact === void 0) { compact = true; }
            return Untappd.API.sendRequest(METHOD_GET_BEER, id, "beer", { compact: compact });
        }
        Info.beer = beer;
        function venue(id, compact) {
            if (compact === void 0) { compact = true; }
            return Untappd.API.sendRequest(METHOD_GET_VENUE, id, "venue", { compact: compact });
        }
        Info.venue = venue;
        function checkin(id) {
            return Untappd.API.sendRequest(METHOD_GET_CHECKIN, id, "checkin");
        }
        Info.checkin = checkin;
    })(Info = Untappd.Info || (Untappd.Info = {}));
})(Untappd || (Untappd = {}));
//# sourceMappingURL=info.js.map