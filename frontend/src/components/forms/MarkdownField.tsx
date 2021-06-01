import autosize from 'autosize';
import get from 'lodash/get';
import React from 'react';
import { FieldError, FieldPath, FieldValues, UseFormReturn } from 'react-hook-form';

import { FieldContainer } from './FieldContainer';

interface Props<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  title: string;
  placeholder?: string;
  form: UseFormReturn<TFieldValues>;
  required?: boolean;
  defaultValue?: string;
}

export const MarkdownField = <T extends FieldValues>({
  name,
  title,
  placeholder,
  defaultValue,
  form,
  required = false,
}: Props<T>): React.ReactElement => {
  // TODO - preview

  const { ref, ...rest } = form.register(name, { required });
  return (
    <FieldContainer
      title={title}
      error={get(form.formState.errors, name) as FieldError}
    >
      <textarea
        className="p-2"
        placeholder={placeholder}
        defaultValue={defaultValue}
        onKeyDown={(e) => {
          if (e.keyCode === 13 && !e.metaKey) {
            e.stopPropagation(); // prevent accidental modal form submission
          }
        }}
        ref={(e) => {
          ref(e);
          if (!e) {
            return;
          }
          // Forms are usually modals, so just calling autosize(e) won't be enough.
          // See "Initial height is incorrect" in http://www.jacklmoore.com/autosize/.
          e.addEventListener('focus', () => autosize(e));
        }}
        {...rest}
      />
    </FieldContainer>
  );
};
