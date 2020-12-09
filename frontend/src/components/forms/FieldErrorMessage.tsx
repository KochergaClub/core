import { FieldError } from 'react-hook-form';

import { ErrorMessage } from './ErrorMessage';

interface Props {
  error?: FieldError;
}

export const FieldErrorMessage: React.FC<Props> = ({ error }) => {
  if (!error) {
    return null;
  }
  switch (error.type) {
    case 'required':
      return <ErrorMessage>Обязательное поле</ErrorMessage>;
    case 'manual':
      return <ErrorMessage>{error.message}</ErrorMessage>;
    case 'pattern':
      return <ErrorMessage>Недопустимое значение</ErrorMessage>;
    default:
      // TODO - support min, max, minLength, maxLength, validate
      return <ErrorMessage>Ошибка: {error.type}</ErrorMessage>;
  }
};
