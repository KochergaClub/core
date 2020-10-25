import { FieldError } from 'react-hook-form';
import styled from 'styled-components';

import { colors } from '~/frontkit';

const Error = styled.small`
  color: ${colors.accent[700]};
  font-weight: bold;
`;

interface Props {
  error?: FieldError;
}

const ErrorMessage: React.FC<Props> = ({ error }) => {
  if (!error) {
    return null;
  }
  switch (error.type) {
    case 'required':
      return <Error>⚠ Обязательное поле</Error>;
    default:
      return <Error>⚠ Ошибка: {error.type}</Error>;
  }
};

export default ErrorMessage;
