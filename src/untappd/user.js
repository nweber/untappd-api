/// <reference path="../untappd.ts" />
var Untappd;
(function (Untappd) {
    var User;
    (function (User) {
        var METHOD_GET_INFO = "/v4/user/info/";
        function info(id, compact) {
            if (compact === void 0) { compact = true; }
            return Untappd.API.sendRequest(METHOD_GET_INFO, id, "user", { compact: compact });
        }
        User.info = info;
        function me(compact) {
            if (compact === void 0) { compact = true; }
            return Untappd.API.sendRequest(METHOD_GET_INFO, undefined, "user", { compact: compact });
        }
        User.me = me;
    })(User = Untappd.User || (Untappd.User = {}));
})(Untappd || (Untappd = {}));
//# sourceMappingURL=user.js.map