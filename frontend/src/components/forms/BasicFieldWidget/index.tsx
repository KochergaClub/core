import '~/css/react-datepicker.css';

import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { ErrorMessage } from 'formik';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import styled from 'styled-components';

import { Input, Label } from '@kocherga/frontkit';

import { BasicFormField, ChoiceFormField } from '../types';
import ErrorLabel from './ErrorLabel';
import ForeignKeyWidget from './ForeignKeyWidget';
import ImageInput from './ImageInput';
import LabeledField from './LabeledField';
import RichTextInput from './RichTextInput';

interface Props {
  field: BasicFormField;
  name: string;
  hideLabel?: boolean; // TODO - handle hideLabel flag
}

const WideInput = styled(Input)`
  width: 100%;
`;

const FieldInputForType: React.FC<{
  field: BasicFormField;
  type: string;
  name: string;
}> = ({ field, type, name }) => (
  <LabeledField for={field} name={name}>
    {({ field }) =>
      type === 'checkbox' ? (
        <Input {...field} type={type} />
      ) : (
        <WideInput {...field} type={type} />
      )
    }
  </LabeledField>
);

const FieldInputForDate: React.FC<{ field: BasicFormField; name: string }> = ({
  field,
  name,
}) => (
  <LabeledField for={field} name={name}>
    {({ field, form }) => (
      <DatePicker
        selected={field.value ? new Date(field.value) : new Date()}
        onChange={(date: Date | null) => {
          form.setFieldValue(
            name,
            date ? format(date, 'yyyy-MM-dd') : undefined
          );
        }}
        customInput={<Input {...field} />}
        dateFormat="yyyy-MM-dd"
        locale={ru}
        inline
      />
    )}
  </LabeledField>
);

const ChoiceFieldInput: React.FC<{ field: ChoiceFormField; name: string }> = ({
  field,
  name,
}) => {
  switch (field.widget) {
    case 'radio':
      return (
        <LabeledField for={field} name={name}>
          {({ field: formikField }) => (
            <>
              {field.options.map((option) => {
                return (
                  <div key={option[0]}>
                    <label>
                      <input
                        type="radio"
                        {...formikField}
                        checked={formikField.value === option[0]}
                        value={option[0]}
                      />{' '}
                      {option[1]}
                    </label>
                  </div>
                );
              })}
            </>
          )}
        </LabeledField>
      );
    default:
      return (
        <LabeledField for={field} name={name}>
          {({ field: formikField, form }) => {
            const option = field.options.find(
              (option) => option[0] === formikField.value
            );
            return (
              <Select
                value={
                  option ? { value: option[0], label: option[1] } : undefined
                }
                onChange={(selected: any) => {
                  // FIXME - fix type
                  if (selected && !Array.isArray(selected)) {
                    form.setFieldValue(formikField.name, selected.value);
                  } // TODO - else?
                }}
                options={field.options.map((option) => ({
                  value: option[0],
                  label: option[1],
                }))}
                menuPlacement="auto"
                menuPortalTarget={document.body}
                styles={{
                  menuPortal: (provided) => ({ ...provided, zIndex: 1100 }),
                  container: (provided) => ({ ...provided, width: '100%' }),
                }}
              />
            );
          }}
        </LabeledField>
      );
  }
};

const BasicFieldWidget: React.FC<Props> = ({ field, name }) => {
  if ('readonly' in field && field.readonly) {
    return (
      <div>
        <Label>{field.name}</Label>
        <div>{field.default}</div>
        <ErrorMessage name={name} component={ErrorLabel} />
      </div>
    );
  }

  switch (field.type) {
    case 'string':
      return <FieldInputForType name={name} field={field} type="text" />;
    case 'richtext':
      return <RichTextInput name={name} field={field} />;
    case 'image':
      return <ImageInput name={name} field={field} />;
    case 'email':
      return <FieldInputForType name={name} field={field} type="email" />;
    case 'date':
      return <FieldInputForDate name={name} field={field} />;
    case 'password':
      return <FieldInputForType name={name} field={field} type="password" />;
    case 'number':
      return (
        <LabeledField for={field} name={name}>
          {({ field: formikField }) => (
            <Input
              {...formikField}
              type="number"
              min={field.min}
              max={field.max}
            />
          )}
        </LabeledField>
      );
    case 'choice':
      return <ChoiceFieldInput name={name} field={field} />;
    case 'boolean':
      return <FieldInputForType name={name} field={field} type="checkbox" />;
    case 'fk':
      if (field.widget) {
        return <ForeignKeyWidget name={name} field={field} />;
      } else {
        return <FieldInputForType name={name} field={field} type="number" />;
      }
  }
};

export default BasicFieldWidget;
