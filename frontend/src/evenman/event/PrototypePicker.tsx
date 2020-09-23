import Select from 'react-select';

import { useQuery } from '@apollo/client';

import { ApolloQueryResults } from '~/components';

import { EvenmanPrototypesForPickerDocument } from './queries.generated';

interface Props {
  selectedId?: string;
  select: (id: string) => void;
}

type OptionType = {
  value: string;
  label: string;
};

const value2option = (g: { id: string; title: string }) => {
  return {
    value: g.id,
    label: g.title,
  };
};

const PrototypePicker: React.FC<Props> = ({ selectedId, select }) => {
  const queryResults = useQuery(EvenmanPrototypesForPickerDocument);

  return (
    <ApolloQueryResults {...queryResults}>
      {({ data: { prototypes } }) => {
        const options = prototypes.map(value2option);
        const findOptionById = (id: string) =>
          options.find((option) => option.value === id);

        return (
          <Select
            placeholder="Выбрать прототип"
            menuPortalTarget={document.body}
            styles={{
              menuPortal: (base) => ({
                ...base,
                zIndex: 1500,
              }),
            }}
            options={options}
            value={selectedId ? findOptionById(selectedId) : null}
            onChange={(option) => {
              if (!option || Array.isArray(option)) {
                return;
              }
              // TODO - explicit casting can be removed with typescript 4.1, see https://github.com/microsoft/TypeScript/pull/39258
              select((option as OptionType).value);
            }}
          />
        );
      }}
    </ApolloQueryResults>
  );
};

export default PrototypePicker;
