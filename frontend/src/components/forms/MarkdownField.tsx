import autosize from 'autosize';
import get from 'lodash/get';
import React from 'react';
import { FieldError, UseFormMethods } from 'react-hook-form';
import styled from 'styled-components';

import { FieldContainer } from './FieldContainer';

interface Props<T extends Record<string, unknown>> {
  name: keyof T;
  title: string;
  placeholder?: string;
  form: UseFormMethods<T>;
  required?: boolean;
  defaultValue?: string;
}

const Textarea = styled.textarea`
  padding: 8px;
`;

export const MarkdownField = <T extends Record<string, unknown>>({
  name,
  title,
  placeholder,
  defaultValue,
  form,
  required = false,
}: Props<T>): React.ReactElement => {
  // TODO - preview
  return (
    <FieldContainer title={title} error={get(form.errors, name) as FieldError}>
      <Textarea
        name={name as string}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onKeyDown={(e) => {
          if (e.keyCode === 13 && !e.metaKey) {
            e.stopPropagation(); // prevent accidental modal form submission
          }
        }}
        ref={(e) => {
          if (!e) {
            return;
          }
          form.register(e, {
            required,
          });
          // Forms are usually modals, so just calling autosize(e) won't be enough.
          // See "Initial height is incorrect" in http://www.jacklmoore.com/autosize/ and useEffect above.
          e.addEventListener('focus', () => autosize(e));
        }}
      />
    </FieldContainer>
  );
};
