interface AnyFieldShape {
  readonly name: string;
  readonly title?: string;
}

interface AnyBasicFieldShape extends AnyFieldShape {
  optional?: boolean;
}

export interface StringFieldShape extends AnyBasicFieldShape {
  readonly type: 'string' | 'email' | 'password' | 'date';
}

export interface RichTextFieldShape extends AnyBasicFieldShape {
  readonly type: 'richtext';
}

export interface NumberFieldShape extends AnyBasicFieldShape {
  readonly type: 'number';
  readonly min?: number;
  readonly max?: number;
}

export interface ChoiceFieldShape extends AnyBasicFieldShape {
  readonly type: 'choice';
  readonly widget?: 'radio' | 'dropdown';
  readonly options: readonly (readonly [string, string])[];
}

export interface BooleanFieldShape extends AnyBasicFieldShape {
  readonly type: 'boolean';
}

export interface ImageFieldShape extends AnyBasicFieldShape {
  readonly type: 'image';
  valueAsNumber?: boolean;
}

export interface ForeignKeyFieldShape extends AnyBasicFieldShape {
  readonly type: 'fk';
  readonly widget: {
    type: 'async';
    display: (item: any) => string;
    load: (inputValue: string) => Promise<any[]>;
    getValue: (item: any) => string;
  };
}

export interface ShapeFieldShape extends AnyFieldShape {
  readonly type: 'shape';
  readonly shape: FormShape;
}

export interface ShapeListFieldShape extends AnyFieldShape {
  readonly type: 'shape-list';
  readonly shape: FormShape;
}

export type BasicFieldShape =
  | StringFieldShape
  | RichTextFieldShape
  | NumberFieldShape
  | ChoiceFieldShape
  | BooleanFieldShape
  | ImageFieldShape
  | ForeignKeyFieldShape;

export type FieldShape = 
  | BasicFieldShape
  | ShapeFieldShape
  | ShapeListFieldShape;

// most shapes are readonly (known at compile time); this gives us nice features such as deriving Values from FormShape
// export type StaticFormShape = readonly FieldShape[];
// other shapes are dynamic
// export type DynamicFormShape = FieldShape[];

// export type FormShape = StaticFormShape | DynamicFormShape;
export type FormShape = readonly FieldShape[];

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

export type FieldToValue<T extends FieldShape> = (
    T extends StringFieldShape ? string :
    T extends NumberFieldShape ? string : // number is represented as string in form.handleSubmit
    T extends RichTextFieldShape ? string :
    T extends BooleanFieldShape ? boolean :
    T extends ImageFieldShape ? string :
    T extends ChoiceFieldShape ? string :
    T extends ShapeFieldShape ? ShapeToValues<T['shape']> :
    T extends ShapeListFieldShape ? ShapeToValues<T['shape']>[] :
    never
);

type _FilterKey<T extends FormShape, K extends keyof T> = 
  T[K] extends FieldShape ? (K extends number ? never : T[K]['name']) : never;

type _ValueByKey<T extends FormShape, K extends keyof T> = 
  T[K] extends FieldShape ? (K extends number ? never : FieldToValue<T[K]>) : never;

export type ShapeToValues<T extends FormShape> =
  T extends readonly [unknown, ...unknown[]]
  ? { [K in keyof T as _FilterKey<T, K>]: _ValueByKey<T, K> }
  : Record<string, unknown> // TODO - use AnyFormValues instead?
;
