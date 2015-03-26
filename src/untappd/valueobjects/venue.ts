/// <reference path="valueobjects.ts" />

interface VenueContact {
    twitter: string;
    venue_url: string;
}

interface VenueLocation extends Location {
    venue_address: string;
    venue_city: string;
    venue_country: string;
    venue_state: string;
}

interface Venue {
    venue_id: number;
    venue_name: string;
    venue_icon?: Icon;
    categories?: {items: Category[]; count: number};
    contact?: VenueContact;
    foursquare?: Foursquare;
    last_updated?: string; // todo - convert to date
    location?: VenueLocation;
    primary_category?: string;
    primary_category_id?: string;
    public_venue?: boolean;
    stats?: GeneralStats;
}
