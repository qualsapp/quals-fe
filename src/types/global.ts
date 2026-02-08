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
};

export type FilterParams = {
  search?: string;
  status?: string;
  page?: number;
  page_size?: number;
  welcome?: boolean;
};
