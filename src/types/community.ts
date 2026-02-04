import { Sport } from "./global";

export interface CommunityProps {
  name: string;
  address: string;
  sports: string[];
  description?: string;
  image?: File;
}

export interface CommunityResponse extends Omit<
  CommunityProps,
  "image, sports"
> {
  id: string;
  image_url: string;
  host_id: string;
  sport_types: Sport[];
}
export interface CommunityListResponse {
  communities: CommunityResponse[];
  page: number;
  page_size: number;
  total: number;
}
