export interface User {
  user_id: string;
  user_type: string;
  token: string;
  message: string;
}

export interface UserProps {
  email: string;
  password: string;
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
  username: string;
  display_name: string;
  sports: string[];
  bio?: string;
  photo_url?: string;
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
  user_id: string;
  username: string;
  display_name: string;
  bio: string;
  photo_url: string;
  message: string;
}
