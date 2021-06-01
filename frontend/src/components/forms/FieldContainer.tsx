import React from 'react';
import { FieldError } from 'react-hook-form';

import { Column, LabelDiv, Row } from '~/frontkit';

import { FieldErrorMessage } from './FieldErrorMessage';

interface Props {
  error?: FieldError | undefined;
  title: string;
  stretch?: boolean;
}

export const FieldContainer: React.FC<Props> = ({
  error,
  title,
  stretch = true,
  children,
}) => {
  return (
    <label>
      <Column gutter={4} stretch={stretch}>
        <Row vCentered>
          <LabelDiv>{title}</LabelDiv>
          {error && <FieldErrorMessage error={error} />}
        </Row>
        {children}
      </Column>
    </label>
  );
};
