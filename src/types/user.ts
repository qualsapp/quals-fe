import { CommunityResponse } from "./community";
import { Sport } from "./global";

export interface User {
  user_id: string;
  user_type: string;
  token: string;
  message: string;
}

export interface UserProps {
  email: string;
  password: string;
  user_type: string;
}

export interface UserProfile {
  username: string;
  display_name: string;
  sports: string[];
  locations: string[];
  level: string;
  bio?: string;
  image_url?: string;
}

export type UserModel = {
  id: string;
  user_id: string;
  username: string;
  display_name: string;
  phone_number: string;
  sport_types: Sport[];
  bio?: string;
  photo_url?: string;
  user_type?: string;
};

export interface UserContextType {
  user: UserProfile | null;
  loading: boolean;
  login: (userData: UserProfile) => void;
  logout: () => void;
}

export interface HostParams {
  username: string;
  display_name: string;
  bio?: string;
  file?: File;
}

export interface HostModel {
  id: string;
  host_id: string;
  user_id: string;
  username: string;
  display_name: string;
  bio: string;
  photo_url: string;
  message: string;
}

export interface HostProfileModel {
  community: CommunityResponse;
  host_detail: HostModel;
}

export type LoginParams = {
  email: string;
  password: string;
  user_type: string;
};

export interface AuthResponse {
  user_id?: string;
  token?: string;
  message?: string;
  email?: string;
  user_type?: string;
  error?: string;
}

export interface UserDetailParams {
  username: string;
  display_name: string;
  bio?: string;
  photo_url?: string;
}

export interface HostDetailResponse extends UserDetailParams {
  id: string;
  user_id: string;
  user_type?: string;
}

export interface PlayerDetailResponse extends UserDetailParams {
  id: string;
  user_id: string;
  user_type?: string;
  phone_number: string;
  sport_types: Sport[];
}
