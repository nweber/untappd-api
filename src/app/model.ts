/// <reference path="../untappd.ts" />

class ApplicationModel {
    // todo - Auerelia binding is choking if user is null.
    //        Initialize user with the bare minimum to get things started.
    //        There's got to be a better way!
    user: User = Constants.EMPTY_USER;

    get loggedIn(): boolean {
        return Untappd.API.authenticated;
    }

    constructor() {

    }
}
