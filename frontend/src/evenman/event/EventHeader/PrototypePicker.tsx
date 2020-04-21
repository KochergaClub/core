import { ApolloQueryResults } from '~/components';

import { ReactSelect } from '../../components/ui';

import { useEvenmanPrototypesForPickerQuery } from './queries.generated';

interface Props {
  selectedId?: string;
  select: (id: string) => void;
}

const value2option = (g: { id: string; title: string }) => {
  return {
    value: g.id,
    label: g.title,
  };
};

const Picker: React.FC<Props> = ({ selectedId, select }) => {
  const queryResults = useEvenmanPrototypesForPickerQuery();

  return (
    <ApolloQueryResults {...queryResults}>
      {({ data: { prototypes } }) => {
        const options = prototypes.map(value2option);
        const findOptionById = (id: string) =>
          options.find(option => option.value === id);

        return (
          <ReactSelect
            placeholder="Выбрать прототип"
            menuPortalTarget={document.body}
            styles={{ menuPortal: (base: any) => ({ ...base, zIndex: 1500 }) }}
            options={options}
            value={selectedId ? findOptionById(selectedId) : null}
            onChange={(option: any) => {
              select(option.value);
            }}
          />
        );
      }}
    </ApolloQueryResults>
  );
};

export default Picker;
