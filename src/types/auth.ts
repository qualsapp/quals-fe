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
