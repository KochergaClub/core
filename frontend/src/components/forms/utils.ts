import { AnyFormValues, FormShape } from './types';

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
