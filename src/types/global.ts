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

export type Filter = {
  search: string;
  page: number;
  page_size: number;
};
