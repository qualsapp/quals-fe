import { Sport } from "./global";

export interface PlayerParams {
  username: string;
  display_name: string;
  bio: string;
  photo_url: string;
  sport_types_ids: number[];
}

export interface PlayerDetailResponse {
  id?: string;
  user_id?: string;
  username?: string;
  display_name?: string;
  phone_number?: string;
  bio?: string;
  photo_url?: string;
  sport_types?: Sport[];
  error?: string;
}

export type PlayerSearchParams = {
  search: string;
};

export type PlayerListResponse = {
  player_details?: {
    id: number;
    display_name: string;
  }[];
  error?: string;
};

export interface JoinCommunityResponse {
  id?: number;
  community_id?: number;
  player_id?: number;
  code?: string;
  error?: string;
}
