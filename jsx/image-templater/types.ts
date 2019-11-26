interface Field {
  name: string;
  value_type: 'str' | 'int' | 'number' | 'date';
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
