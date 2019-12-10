import { FormShape, FormField } from './types';

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
    shape = shape.filter(field => !exclude.includes(field.name));
  }
  if (transform) {
    shape = shape.map(field => {
      const cb = transform[field.name];
      if (!cb) {
        return field;
      }
      return cb(field);
    });
  }
  return shape;
};
