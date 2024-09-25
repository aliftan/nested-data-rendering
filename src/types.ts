export interface WatchHistoryItem {
    title: string;
    watched_date: string;
}

export interface User {
    name: string;
    email: string;
    birthdate: string;
    subscription_date: string;
    watch_history: WatchHistoryItem[];
}

export interface Genre {
    genre: string;
    users: User[];
}

export interface CountryData {
    country: string;
    genres: Genre[];
}

export type AppData = CountryData[];