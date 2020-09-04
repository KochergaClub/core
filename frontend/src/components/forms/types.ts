import { FormikErrors } from 'formik';

export interface AnyFormField {
  readonly name: string;
  readonly title?: string;
}

export interface AnyBasicFormField extends AnyFormField {
  readonly?: boolean;
  optional?: boolean;
}

export interface StringFormField extends AnyBasicFormField {
  readonly type: 'string' | 'email' | 'password' | 'date';
  readonly default?: string;
}

export interface NumberFormField extends AnyBasicFormField {
  readonly type: 'number';
  readonly default?: number;
  readonly min?: number;
  readonly max?: number;
}

export interface ChoiceFormField extends AnyBasicFormField {
  readonly type: 'choice';
  readonly widget?: 'radio' | 'dropdown';
  readonly default?: string;
  readonly options: [string, string][];
}

export interface BooleanFormField extends AnyBasicFormField {
  readonly type: 'boolean';
  readonly default?: boolean;
}

export interface ForeignKeyFormField extends AnyBasicFormField {
  readonly type: 'fk';
  readonly default?: number | string;
  readonly widget?: {
    type: 'async';
    display: (item: any) => string;
    load: (inputValue: string) => Promise<any[]>;
    getValue: (item: any) => number | string;
  };
}

export interface ShapeFormField extends AnyFormField {
  readonly type: 'shape';
  readonly shape: FormShape;
}

export interface ListFormField extends AnyFormField {
  readonly type: 'list';
  readonly field: FormField;
}

export type BasicFormField =
  | StringFormField
  | NumberFormField
  | ChoiceFormField
  | BooleanFormField
  | ForeignKeyFormField;

export type FormField = BasicFormField | ShapeFormField | ListFormField;

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

export interface PostResult<Values extends AnyFormValues> {
  close: boolean;
  error?: string;
  formErrors?: FormikErrors<Values>;
}
