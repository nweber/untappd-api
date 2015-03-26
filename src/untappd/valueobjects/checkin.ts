/// <reference path="valueobjects.ts" />

interface Comment {

}

interface Toast {
    created_at: string; // todo - convert to date
    like_id: number;
    like_owner: boolean;
    uid: number;
    user: User;
}

interface CheckIn {
    badges: {count: number; items:Badge[]};
    beer: Beer;
    brewery: Brewery;
    checkin_comment: string;
    checkin_id: number;
    comments: {count: number; items:Comment[]};
    created_at: string; // todo - convert to date
    media: {count: number; items:Media[]};
    rating_score: number;
    source: ApplicationSource;
    toasts: {auth_toast: string; count: number; items: Toast[]; total_count: number};
    user: User;
    venue: Venue;
}