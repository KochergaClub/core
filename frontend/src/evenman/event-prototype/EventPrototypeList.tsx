import { getUnixTime, addWeeks } from 'date-fns';

import { Column } from '@kocherga/frontkit';

import { ApolloQueryResults } from '~/components';

import { useEvenmanPrototypesQuery } from './queries.generated';
import PrototypeNavList from './PrototypeNavList';

interface Props {
  selectedId?: string;
}

const EventPrototypeList = (props: Props) => {
  const queryResults = useEvenmanPrototypesQuery({
    variables: {
      suggested_until_ts: getUnixTime(addWeeks(new Date(), 1)),
    },
  });

  return (
    <ApolloQueryResults {...queryResults}>
      {({ data: { prototypes } }) => (
        <div>
          <Column gutter={10} stretch>
            <PrototypeNavList
              title="Активные"
              items={prototypes.filter(p => p.active)}
              selectedId={props.selectedId}
            />
            <PrototypeNavList
              title="Неактивные"
              items={prototypes.filter(p => !p.active)}
              selectedId={props.selectedId}
            />
          </Column>
        </div>
      )}
    </ApolloQueryResults>
  );
};

export default EventPrototypeList;
