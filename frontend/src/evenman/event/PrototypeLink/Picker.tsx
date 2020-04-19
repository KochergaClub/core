import { ApolloQueryResults } from '~/components';

import { ReactSelectCreatable } from '../../components/ui';

import { useEvenmanPrototypesForPickerQuery } from './queries.generated';
import { EvenmanEvent_DetailsFragment } from '../queries.generated';
import { useUpdateMutation } from '../hooks';

interface Props {
  event: EvenmanEvent_DetailsFragment;
}

const Picker = ({ event }: Props) => {
  const queryResults = useEvenmanPrototypesForPickerQuery();
  const update = useUpdateMutation(event.id);

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
              prototypes.length ? value2option(prototypes[0]) : null // FIXME - selected -> value2option
            }
            onChange={(option: any) => {
              update({ prototype_id: option.value });
            }}
          />
        );
      }}
    </ApolloQueryResults>
  );
};

export default Picker;
