declare module Topojson {
    export interface Base {
        feature(json: any, collection: any): {features: any};
    }
}

declare var topojson: Topojson.Base;

declare module "topojson" {
    export = topojson;
}
