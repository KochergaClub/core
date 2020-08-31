import { useCallback } from 'react';
import AsyncSelect from 'react-select/async';

import { ForeignKeyFormField } from '../types';
import LabeledField from './LabeledField';

interface Props {
  field: ForeignKeyFormField;
  name: string;
}

const ForeignKeyWidget: React.FC<Props> = ({ field, name }) => {
  const { widget } = field;

  if (!widget) {
    throw new Error('Expected FK field with widget');
  }

  interface OptionType {
    value: number;
    label: string;
  }

  const loadOptions = useCallback(
    async (inputValue) => {
      const items = await widget.load(inputValue);
      const options = items.map((item) => ({
        value: widget.getValue(item),
        label: widget.display(item),
      }));
      return options;
    },
    [widget]
  );

  return (
    <LabeledField for={field} name={name}>
      {({ field: formikField, form }) => {
        return (
          <AsyncSelect
            loadOptions={loadOptions}
            onChange={(selected) => {
              if (!selected) {
                return;
              }
              form.setFieldValue(
                formikField.name,
                (selected as OptionType).value
              );
            }}
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
};

export default ForeignKeyWidget;
