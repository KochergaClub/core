export interface AnyFormField {
  readonly name: string;
  readonly title?: string;
  readonly?: boolean;
  optional?: boolean;
}

export interface StringFormField extends AnyFormField {
  readonly type: 'string' | 'email' | 'password' | 'date';
  readonly value?: string;
}

export interface NumberFormField extends AnyFormField {
  readonly type: 'number';
  readonly value?: number;
  readonly min?: number;
  readonly max?: number;
}

export interface ChoiceFormField extends AnyFormField {
  readonly type: 'choice';
  readonly widget?: 'radio' | 'dropdown';
  readonly value?: string;
  readonly options: [string, string][];
}

export interface BooleanFormField extends AnyFormField {
  readonly type: 'boolean';
  readonly value?: boolean;
}

export interface ForeignKeyFormField extends AnyFormField {
  readonly type: 'fk';
  readonly value?: number | string;
  readonly widget?: {
    type: 'async';
    display: (item: any) => string;
    load: (inputValue: string) => Promise<any[]>;
    getValue: (item: any) => number | string;
  };
}

export interface ShapeFormField extends AnyFormField {
  readonly type: 'shape';
  readonly value?: AnyFormValues;
  readonly shape: FormShape;
}

export interface ListFormField extends AnyFormField {
  readonly type: 'list';
  readonly value?: AnyFormValues[];
  readonly field: FormField;
}

export type FormField =
  | StringFormField
  | NumberFormField
  | ChoiceFormField
  | BooleanFormField
  | ForeignKeyFormField
  | ShapeFormField
  | ListFormField;

export type FormShape = FormField[];

export type AnyFormValues = {
  [k: string]:
    | string
    | number
    | boolean
    | AnyFormValues
    | AnyFormValues[]
    | null
    | undefined;
};
