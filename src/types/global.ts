export type Option = {
  label: string;
  value: string;
};

export type Sport = {
  id: string;
  name: string;
  slug: string;
};

export type SportResponse = {
  sport_types: Sport[];
  error?: string;
};

export type FilterParams = {
  search?: string;
  status?: string;
  tournament_id?: string;
  page?: number;
  page_size?: number;
  welcome?: boolean;
};
