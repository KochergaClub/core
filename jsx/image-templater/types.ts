interface Field {
  name: string;
  value_type: string;
  default?: string;
}

interface Sizes {
  width: number;
  height: number;
}

interface Schema {
  fields: [Field];
}

export interface ImageTemplate {
  name: string;
  schema: Schema;
  sizes: Sizes;
}
