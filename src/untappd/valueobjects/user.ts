/// <reference path="valueobjects.ts" />

interface UserStats {
    total_beers: number;
    total_checkins: number;
}

interface User {
    uid: number;
    user_name: string;
    bio?: string;
    contact?: Object[]; // todo - what type of objects are in here?  2dim array?
    is_private?: number; // todo - convert to boolean
    is_supporter?: number; // todo - convert to boolean
    first_name?: string;
    last_name?: string;
    location?: string;
    relationship?: string;
    stats?: UserStats;
    url?: string;
    user_avatar?: string;
}
