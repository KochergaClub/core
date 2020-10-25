import React from 'react';
import { FieldError } from 'react-hook-form';

import { Column, Label, Row } from '~/frontkit';

import ErrorMessage from './ErrorMessage';

interface Props {
  error: FieldError | undefined;
  title: string;
}

const FieldContainer: React.FC<Props> = ({ error, title, children }) => {
  return (
    <Column gutter={4} stretch>
      <Row vCentered>
        <Label>{title}</Label>
        {error && <ErrorMessage error={error} />}
      </Row>
      {children}
    </Column>
  );
};

export default FieldContainer;
