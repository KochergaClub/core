import get from 'lodash/get';
import React, { CSSProperties, useCallback } from 'react';
import { Controller, FieldError, UseFormMethods } from 'react-hook-form';
import AsyncSelect from 'react-select/async';

import { FieldContainer } from './FieldContainer';

interface Props<T extends Record<string, unknown>, I> {
  name: keyof T;
  title: string;
  form: UseFormMethods<T>;
  display: (item: I) => string;
  load: (inputValue: string) => Promise<I[]>;
  getValue: (item: I) => string;
  required?: boolean;
}

export const AsyncSelectField = <T extends Record<string, unknown>, I>({
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
    <FieldContainer title={title} error={get(form.errors, name) as FieldError}>
      <Controller
        name={name as string}
        control={form.control as any}
        rules={{ required }}
        render={({ onChange, value }) => {
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
                menuPortal: (provided: CSSProperties) => ({
                  ...provided,
                  zIndex: 1100,
                }),
                container: (provided: CSSProperties) => ({
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
