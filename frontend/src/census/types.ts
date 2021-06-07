export type Structure = {
  title: string;
  columns: string[];
}[];

export type GroupedItem = {
  count: number;
  id: string;
  name: string;
  special?: 'empty' | 'tail';
};

export type Data = {
  title: string;
  limit: number;
  values: { value: number | string; count: number }[];
  custom_sort?: string[];
  sort: 'top' | 'numerical' | 'lexical' | 'last_int';
  multiple: boolean;
  shortcuts: { [k: string]: string };
  show: 'text' | 'histogram';
  note?: string;
  extract_other: boolean;
  other_values?: string[];
};

export type Histogram = {
  values: GroupedItem[];
  empty: GroupedItem;
  tail?: GroupedItem;
  data: Data;
};

export type Survey = {
  total: number;
  structure: Structure;
  data: { [k: string]: Data };
};
