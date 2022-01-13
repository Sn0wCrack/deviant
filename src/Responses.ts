export interface AuthorizationSuccess extends GeneralError {
    expires_in: number;
    status: string;
    access_token: string;
    token_type: string;
}

export interface PlaceboResponse extends GeneralError {
    status: string;
}

export interface DeviantionResponse extends GeneralError {
    deviationid: string;
    printid: string | null;
    url: string;
    title: string;
    category: string;
    category_path: string;
    is_favourited: boolean;
    is_deleted: boolean;
    is_published: boolean;
    author: {
        userid: string;
        username: string;
        usericon: string;
        type: string;
    };
    stats: {
        comments: number;
        favourites: number;
    };
    published_time: string;
    allow_comments: true;
    preview?: DeviationImage;
    content?: DeviationImage;
    thumbs: Array<DeviationImage>;
    is_mature: boolean;
    is_downloadable: boolean;
}

export interface DeviationImage {
    src: string;
    height: number;
    width: number;
    transparency: boolean;
}

export interface DeviationContentResponse extends GeneralError {
    html?: string;
    css?: string;
    css_fronts?: Array<string>;
}

export interface DeviationMetadataResponse extends GeneralError {
    description: string;
    tags: Array<DeviationTag>;
    submission: {
        creation_string: string;
    }
    stats: {
        views: number;
        views_today?: number;
        favourites: number;
        comments: number;
        downloads: number;
        downloads_today?: number;
    };
    
}

export interface DeviationTag {
    tag_name: string;
    sponsored: boolean;
    sponsor: string;
}

export interface GeneralError {
    error?: string;
    error_description?: string;
    error_details?: Record<string, any>;
    error_code?: number;
}