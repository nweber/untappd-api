/// <reference path="valueobjects.ts" />

interface Vintage {

}

interface Beer {
    beer_description: string;
    beer_label: string;
    beer_name: string;
    beer_style: string;
    bid: number;
    auth_rating?: number;
    beer_abv?: number;
    beer_ibu?: number;
    beer_slug?: string;
    brewery?: Brewery;
    created_at?: string; // todo - convert to date
    is_homebrew?: number; // todo - convert to boolean
    is_in_production?: number; // todo - convert to boolean
    rating_count?: number;
    rating_score?: number;
    stats?: GeneralStats;
    vintages?: {items: Vintage[]; count: number};
    wish_list?: boolean;
}