export interface CommunityProps {
  name: string;
  address: string;
  sports: string[];
  description?: string;
  file?: File;
}

export interface CommunityResponse extends Omit<CommunityProps, "file"> {
  id: string;
  photo_url: string;
}
