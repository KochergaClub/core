import { FieldError } from 'react-hook-form';

import { Badge } from '~/frontkit';

const ErrorMessage: React.FC<{ error: FieldError }> = ({ error }) => {
  switch (error.type) {
    case 'required':
      return <Badge type="accent">Обязательное поле</Badge>;
    default:
      return <Badge type="accent">Ошибка: {error.type}</Badge>;
  }
};

export default ErrorMessage;
