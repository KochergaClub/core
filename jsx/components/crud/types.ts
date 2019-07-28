interface AnyFormField {
  name: string;
  readonly?: boolean;
}
export interface StringFormField extends AnyFormField {
  type: 'string';
  value?: string;
}

export interface NumberFormField extends AnyFormField {
  type: 'number';
  value?: number;
}

export interface ChoiceFormField extends AnyFormField {
  type: 'choice';
  value?: string;
  options: string[];
}

export type FormField = StringFormField | NumberFormField | ChoiceFormField;

export type Values = { [k: string]: string | number };