import { Sport } from "./global";

export type CommunityParams = {
  name: string;
  address: string;
  sports: string[];
  description?: string;
  image?: File;
};

export type CommunityResponse = Omit<CommunityParams, "image" | "sports"> & {
  id: string;
  image_url: string;
  host_id: string;
  sport_types: Sport[];
  error?: string;
};

export type CommunityListResponse = {
  communities: CommunityResponse[];
  page: number;
  page_size: number;
  total: number;
  error?: string;
};
