export interface User {
  user_id: string;
  user_type: string;
  token: string;
  message: string;
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
