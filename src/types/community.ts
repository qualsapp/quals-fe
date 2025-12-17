export interface CommunityProps {
  name: string;
  address: string;
  sports: string;
  description?: string;
  image?: File;
}

export interface CommunityResponse extends Omit<CommunityProps, "image"> {
  id: string;
  image_url: string;
}
