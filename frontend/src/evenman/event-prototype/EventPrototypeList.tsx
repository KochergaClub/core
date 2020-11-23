import { addWeeks, getUnixTime, startOfToday } from 'date-fns';

import { useQuery } from '@apollo/client';

import { ApolloQueryResults } from '~/components';
import { Column } from '~/frontkit';

import LoadingOverlay from '../components/LoadingOverlay';
import PrototypeNavList from './PrototypeNavList';
import { EvenmanPrototypesDocument } from './queries.generated';

interface Props {
  selectedId?: string;
}

const EventPrototypeList = (props: Props) => {
  const queryResults = useQuery(EvenmanPrototypesDocument, {
    variables: {
      suggested_until_ts: getUnixTime(addWeeks(startOfToday(), 1)),
    },
  });

  return (
    <ApolloQueryResults
      {...queryResults}
      renderLoading={() => <LoadingOverlay progress={true} />}
    >
      {({ data: { prototypes } }) => (
        <div>
          <Column gutter={10} stretch>
            <PrototypeNavList
              title="Активные прототипы"
              items={prototypes.filter((p) => p.active)}
              selectedId={props.selectedId}
            />
            <PrototypeNavList
              title="Неактивные прототипы"
              items={prototypes.filter((p) => !p.active)}
              selectedId={props.selectedId}
            />
          </Column>
        </div>
      )}
    </ApolloQueryResults>
  );
};

export default EventPrototypeList;
