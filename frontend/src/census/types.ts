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
  sort: 'top' | 'numerical' | 'lexical' | 'last_int' | 'choices';
  multiple: boolean;
  show: 'text' | 'histogram';
  note?: string;
  other_values?: string[];
  choices?: string[];
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
