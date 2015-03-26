/// <reference path="valueobjects.ts" />

interface BreweryContact {
    facebook: string;
    instagram: string;
    twitter: string;
    url: string;
}

interface BreweryLocation {
    brewery_address: string;
    brewery_city: string;
    brewery_lat: number;
    brewery_lng: number;
    brewery_state: string;
}

interface Brewery {
    brewery_id: number;
    brewery_label: string;
    brewery_name: string;
    country_name: string;
    location: BreweryLocation;
    beer_count?: number;
    brewery_description?: string;
    brewery_in_production?: number;
    brewery_slug?: string;
    brewery_type?: string;
    brewery_type_id?: number;
    claimed_status?: ClaimedStatus;
    contact?: BreweryContact;
    is_independent?: number; // todo - convert to boolean
    owners?: {items: Person[]; count: number};
    rating?: Rating;
    stats?: GeneralStats;
}