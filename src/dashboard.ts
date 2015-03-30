/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="untappd.ts" />
/// <reference path="app/model.ts" />

export class Dashboard {
    APP_ID: string = "1D3A493C902B2B2A9F3517877A79CFE8E8188A10";
    APP_SECRET: string = "DA1EA02D9EC371E34B2A439E92E2C1E62A9F44A1";

    public heading: string;
    public model: ApplicationModel;

    public onLogoutClick():void {
        Untappd.Authentication.logout();
        this.model.user = Constants.EMPTY_USER; // todo - aurelia binding will choke it if this is null
    }

    public onLoginClick(): void {
        Untappd.Authentication.login();
    }

    public getBreweryDetails(): void {
        var bid: string = $('#info-brewery-list').val();
        console.log("Getting details for id: " + bid);
        Untappd.Info.brewery(bid).done((info: Brewery) => {
            console.log("Name: " + info.brewery_name);
            console.log(info);
        });
    }

    public getBeerDetails(): void {
        var bid: string = $('#info-beer-list').val();
        console.log("Getting details for id: " + bid);
        Untappd.Info.beer(bid).done((info: Beer) => {
            console.log("Name: " + info.beer_name);
            console.log(info)
        });
    }

    public getVenueDetails(): void {
        var bid: string = $('#info-venue-list').val();
        console.log("Getting details for id: " + bid);
        Untappd.Info.venue(bid).done((info: Venue) => {
            console.log("Name: " + info.venue_name);
            console.log(info)
        });
    }

    public getCheckInDetails(): void {
        var bid: string = $('#info-checkin-list').val();
        console.log("Getting details for id: " + bid);
        Untappd.Info.checkin(bid).done((info: CheckIn) => {
            console.log("From: " + info.user.user_name);
            console.log("Comment: " + info.checkin_comment);
            console.log(info)
        });
    }

    constructor() {
        this.heading = "Untappd API Dashboard";

        // Initialize data structures.
        this.model = new ApplicationModel();

        // Initialize API.
        // note - If I do () => {} for the callback it works fine.
        //        If I do function () {} for the callback my scope is not right and 'this.model' breaks.
        //        (Typical scope callback problem, solved with a var self = this; in ye olde javascript.
        //        There must be some magic that figures out the scope when using () => {}.
        Untappd.API.initialize(this.APP_ID, this.APP_SECRET).done(() => {
            if (Untappd.API.authenticated) {
                console.log("Authenticated, getting user info.");
                Untappd.User.me().done((user: User) => {
                    this.model.user = user;
                    console.log("Logged in user info..");
                    console.log(this.model.user);
                });
            }
        }).fail((info: string) => {
            alert(info);
        });
    }
}

/*
function returnComplete(): {color: string; area: number} {
    return {
        color: "red",
        area: 10
    };
}

function testMethod(): void {
    var obj = returnComplete();
    console.log(obj.color);
    console.log(obj.area);
}
*/
