/// <reference path="valueobjects.ts" />

interface ApplicationSource {
    app_name: string;
    app_website: string;
}

interface Rating {
    count: number;
    rating_score: number;
}

interface Person {

}

interface Image {
    lg: string;
    md: string;
    sm: string;
}

interface Icon extends Image {

}

interface Media {
    photo_id: string;
    photo: Photo;
}

interface Photo {
    photo_img_lg: string;
    photo_img_md: string;
    photo_img_og: string;
    photo_img_sm: string;
}

interface GeneralStats {
    monthly_count: number;
    total_count: number;
    user_count: number;
    weekly_count: number;
    unique_count?: number;
    age_on_service?: number;
    total_user_count?: number;
}

interface Category {
    category_id: string;
    category_name: string;
    is_primary: boolean;
}

interface ClaimedStatus {
    claimed_slug: string;
    follow_status: boolean;
    follower_count: number;
    is_claimed: boolean;
    mute_status: string;
    uid: number;
}

interface Foursquare {
    foursquare_id: string;
    foursquare_url: string;
}

interface Location {
    lat: number;
    lng: number;
}
