/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/jquery.cookie/jquery.cookie.d.ts" />
/// <reference path="../typings/aurelia/aurelia.d.ts" />
/// <reference path="untappd.ts" />

import aur = require("aurelia-router");

export class App {
    static inject = [aur.Router];

    constructor(private router: aur.Router) {
        this.router.configure((config) => {
            config.title = "Untappd API";
            config.map([
                { route: ["", "welcome"], moduleId: "welcome", nav: true, title: "Welcome" },
                { route: "dashboard", moduleId: "dashboard", nav: true, title: "Dashboard" },
                { route: "map", moduleId: "map", nav: true, title: "Checkin Map" }
            ]);
        });
    }
}
