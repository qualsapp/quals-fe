import { CommunityResponse } from "./community";

export type HostDetailParams = {
  username: string;
  display_name: string;
  bio: string;
  file: File;
};

export type HostDetailResponse = {
  id?: string;
  user_id?: string;
  username?: string;
  display_name?: string;
  bio?: string;
  photo_url?: string;
  error?: string;
};

export type HostProfileResponse = {
  community: CommunityResponse;
  host_detail: HostDetailResponse;
  error?: string;
};
