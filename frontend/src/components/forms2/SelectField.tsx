import React, { CSSProperties } from 'react';
import { Controller, FieldError, UseFormMethods } from 'react-hook-form';
import Select from 'react-select';

import FieldContainer from './FieldContainer';

const tupleToSelectOption = (t: readonly [string, string]) => ({
  value: t[0],
  label: t[1],
});

interface Props<T extends Record<string, unknown>> {
  name: keyof T;
  title: string;
  form: UseFormMethods<T>;
  options: readonly (readonly [string, string])[];
  required?: boolean;
}

export const SelectField = <T extends Record<string, unknown>>({
  name,
  title,
  options,
  form,
  required = false,
}: Props<T>): React.ReactElement => {
  return (
    <FieldContainer title={title} error={form.errors[name] as FieldError}>
      <Controller
        name={name as string}
        control={form.control as any}
        rules={{ required }}
        render={({ onChange, value }) => {
          const option = options.find((option) => option[0] === value);
          return (
            <Select
              placeholder="Выбрать..."
              value={option ? tupleToSelectOption(option) : undefined}
              options={options.map(tupleToSelectOption)}
              menuPlacement="auto"
              onChange={(option) => {
                if (option) {
                  if (option && !Array.isArray(option)) {
                    onChange(option.value);
                  } else {
                    onChange('');
                  }
                }
              }}
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
