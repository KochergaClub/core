import { useEffect, useState } from 'react';
import Select from 'react-select';

import { ForeignKeyFormField } from '../types';
import LabeledField from './LabeledField';

interface Props {
  field: ForeignKeyFormField;
}

const ForeignKeyWidget: React.FC<Props> = ({ field }) => {
  const { widget } = field;

  if (!widget) {
    throw new Error('Expected FK field with widget');
  }

  interface OptionType {
    value: number;
    label: string;
  }

  const [options, setOptions] = useState([] as OptionType[]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const asyncEffect = async () => {
      const items = await widget.load();
      const options = items.map(item => ({
        value: widget.getValue(item),
        label: widget.display(item),
      }));
      setOptions(options);
      setLoading(false);
    };
    asyncEffect();
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <LabeledField for={field}>
      {({ field: formikField, form }) => {
        const selectedOption = options.find(
          option => option.value === formikField.value
        );
        return (
          <Select
            value={selectedOption}
            options={options}
            onChange={selected => {
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
              menuPortal: provided => ({ ...provided, zIndex: 1100 }),
              container: provided => ({ ...provided, width: '100%' }),
            }}
          />
        );
      }}
    </LabeledField>
  );
};

export default ForeignKeyWidget;
