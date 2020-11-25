import { FormikErrors } from 'formik';

export interface AnyFieldShape {
  readonly name: string;
  readonly title?: string;
}

export interface AnyBasicFieldShape extends AnyFieldShape {
  readonly?: boolean;
  optional?: boolean;
}

export interface StringFieldShape extends AnyBasicFieldShape {
  readonly type: 'string' | 'email' | 'password' | 'date';
  readonly default?: string;
}

export interface RichTextFieldShape extends AnyBasicFieldShape {
  readonly type: 'richtext';
  readonly default?: string;
}

export interface NumberFieldShape extends AnyBasicFieldShape {
  readonly type: 'number';
  readonly default?: number;
  readonly min?: number;
  readonly max?: number;
}

export interface ChoiceFieldShape extends AnyBasicFieldShape {
  readonly type: 'choice';
  readonly widget?: 'radio' | 'dropdown';
  readonly default?: string;
  readonly options: [string, string][];
}

export interface BooleanFieldShape extends AnyBasicFieldShape {
  readonly type: 'boolean';
  readonly default?: boolean;
}

export interface ImageFieldShape extends AnyBasicFieldShape {
  readonly type: 'image';
  readonly default?: string;
}

export interface ForeignKeyFieldShape extends AnyBasicFieldShape {
  readonly type: 'fk';
  readonly default?: number | string;
  readonly widget?: {
    type: 'async';
    display: (item: any) => string;
    load: (inputValue: string) => Promise<any[]>;
    getValue: (item: any) => number | string;
  };
}

export interface ShapeFieldShape extends AnyFieldShape {
  readonly type: 'shape';
  readonly shape: FormShape;
}

export interface ListFieldShape extends AnyFieldShape {
  readonly type: 'list';
  readonly field: FieldShape;
}

export type BasicFieldShape =
  | StringFieldShape
  | RichTextFieldShape
  | NumberFieldShape
  | ChoiceFieldShape
  | BooleanFieldShape
  | ImageFieldShape
  | ForeignKeyFieldShape;

export type FieldShape = BasicFieldShape | ShapeFieldShape | ListFieldShape;

export type FormShape = FieldShape[];

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
