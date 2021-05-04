import get from 'lodash/get';
import React, { useCallback } from 'react';
import { Controller, FieldError, FieldPath, FieldValues, UseFormReturn } from 'react-hook-form';
import AsyncSelect from 'react-select/async';

import { FieldContainer } from './FieldContainer';

interface Props<TFieldValues extends FieldValues, I> {
  name: FieldPath<TFieldValues>;
  title: string;
  form: UseFormReturn<TFieldValues>;
  display: (item: I) => string;
  load: (inputValue: string) => Promise<I[]>;
  getValue: (item: I) => string;
  required?: boolean;
}

export const AsyncSelectField = <T extends FieldValues, I>({
  name,
  title,
  form,
  display,
  load,
  getValue,
  required = false,
}: Props<T, I>): React.ReactElement => {
  const loadOptions = useCallback(
    async (inputValue: string) => {
      const items = await load(inputValue);
      const options = items.map((item) => ({
        value: getValue(item),
        label: display(item),
      }));
      return options;
    },
    [getValue, display, load]
  );

  return (
    <FieldContainer
      title={title}
      error={get(form.formState.errors, name) as FieldError}
    >
      <Controller
        name={name}
        control={form.control}
        rules={{ required }}
        render={({ field: { onChange } }) => {
          return (
            <AsyncSelect
              loadOptions={loadOptions}
              onChange={(option) => {
                if (option) {
                  if (option && !Array.isArray(option)) {
                    onChange(option.value);
                  } else {
                    onChange('');
                  }
                }
              }}
              menuPlacement="auto"
              menuPortalTarget={
                typeof document === 'undefined' ? undefined : document.body // document can be undefined in SSR
              }
              styles={{
                menuPortal: (provided) => ({
                  ...provided,
                  zIndex: 1100,
                }),
                container: (provided) => ({
                  ...provided,
                  width: '100%',
                }),
              }}
            />
          );
        }}
      />
    </FieldContainer>
  );
};
