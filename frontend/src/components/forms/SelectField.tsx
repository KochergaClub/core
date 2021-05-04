import get from 'lodash/get';
import React from 'react';
import { Controller, FieldError, FieldPath, FieldValues, UseFormReturn } from 'react-hook-form';
import Select from 'react-select';

import { FieldContainer } from './FieldContainer';

const tupleToSelectOption = (t: readonly [string, string]) => ({
  value: t[0],
  label: t[1],
});

interface Props<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  title: string;
  options: readonly (readonly [string, string])[];
  form: UseFormReturn<TFieldValues>;
  defaultValue?: string;
  required?: boolean;
}

export const SelectField = <T extends FieldValues>({
  name,
  title,
  options,
  form,
  defaultValue,
  required = false,
}: Props<T>): React.ReactElement => {
  return (
    <FieldContainer
      title={title}
      error={get(form.formState.errors, name) as FieldError}
    >
      <Controller
        name={name}
        control={form.control}
        rules={{ required }}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => {
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
