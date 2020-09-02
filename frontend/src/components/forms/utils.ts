import { AnyFormValues, FormField, FormShape } from './types';

interface TransformParams {
  exclude?: string[];
  transform?: { [k: string]: (field: FormField) => FormField };
}

export const transformShape = (
  sourceShape: FormShape,
  { exclude, transform }: TransformParams
): FormShape => {
  let shape = sourceShape;
  if (exclude) {
    shape = shape.filter((field) => !exclude.includes(field.name));
  }
  if (transform) {
    shape = shape.map((field) => {
      const cb = transform[field.name];
      if (!cb) {
        return field;
      }
      return cb(field);
    });
  }
  return shape;
};

export const buildInitialValues = (shape: FormShape): AnyFormValues => {
  const result: AnyFormValues = {};
  for (const field of shape) {
    let value: AnyFormValues[keyof AnyFormValues] = '';

    switch (field.type) {
      case 'boolean':
        // Without this special case the initial value of boolean field becomes '', which leads to "Required" errors for untouched fields.
        // TODO - check if this was fixed in formik v2
        value = field.default || false;
        break;
      case 'shape':
        value = buildInitialValues(field.shape);
        break;
      case 'list':
        // throw new Error("Can't handle lists yet");
        value = [];
        break;
      default:
        if (field.default) {
          value = field.default;
        }
    }
    result[field.name] = value;
  }
  return result;
};
