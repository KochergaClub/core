import React from 'react';
import { FieldError } from 'react-hook-form';

import { Column, LabelDiv, Row } from '~/frontkit';

import ErrorMessage from './ErrorMessage';

interface Props {
  error: FieldError | undefined;
  title: string;
}

const FieldContainer: React.FC<Props> = ({ error, title, children }) => {
  return (
    <label>
      <Column gutter={4} stretch>
        <Row vCentered>
          <LabelDiv>{title}</LabelDiv>
          {error && <ErrorMessage error={error} />}
        </Row>
        {children}
      </Column>
    </label>
  );
};

export default FieldContainer;
