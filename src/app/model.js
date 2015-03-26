/// <reference path="../../tsd/jquery.d.ts" />
/// <reference path="../../tsd/jquery.cookie.d.ts" />
/// <reference path="../untappd.ts" />
var ApplicationModel = (function () {
    function ApplicationModel() {
        // todo - Auerelia binding is choking if user is null.
        //        Initialize user with the bare minimum to get things started.
        //        There's got to be a better way!
        this.user = Constants.EMPTY_USER;
    }
    Object.defineProperty(ApplicationModel.prototype, "loggedIn", {
        get: function () {
            return Untappd.API.authenticated;
        },
        enumerable: true,
        configurable: true
    });
    return ApplicationModel;
})();
//# sourceMappingURL=model.js.map