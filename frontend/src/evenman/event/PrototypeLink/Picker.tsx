import { ApolloQueryResults } from '~/components';

import { ReactSelectCreatable } from '../../components/ui';

import { Event } from '../../stores/Event';

import { useEvenmanPrototypesForPickerQuery } from './queries.generated';

interface Props {
  event: Event;
}

const Picker = ({ event }: Props) => {
  const queryResults = useEvenmanPrototypesForPickerQuery();

  return (
    <ApolloQueryResults {...queryResults}>
      {({ data: { prototypes } }) => {
        const value2option = (g: { id: string; title: string }) => {
          return {
            value: g.id,
            label: g.title,
          };
        };

        return (
          <ReactSelectCreatable
            placeholder="Выбрать прототип"
            options={prototypes.map(value2option)}
            value={
              value2option(prototypes[0]) // FIXME - selected -> value2option
            }
            onChange={(option: any) => {
              event.setPrototypeId(option.value);
            }}
          />
        );
      }}
    </ApolloQueryResults>
  );
};

export default Picker;
