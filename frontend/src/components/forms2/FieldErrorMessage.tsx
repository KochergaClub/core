import { FieldError } from 'react-hook-form';

import ErrorMessage from './ErrorMessage';

interface Props {
  error?: FieldError;
}

const FieldErrorMessage: React.FC<Props> = ({ error }) => {
  if (!error) {
    return null;
  }
  switch (error.type) {
    case 'required':
      return <ErrorMessage>Обязательное поле</ErrorMessage>;
    case 'manual':
      return <ErrorMessage>{error.message}</ErrorMessage>;
    default:
      // TODO
      return <ErrorMessage>Ошибка: {error.type}</ErrorMessage>;
  }
};

export default FieldErrorMessage;
