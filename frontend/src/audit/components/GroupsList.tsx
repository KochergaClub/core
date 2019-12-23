import { ApolloQueryResults } from '~/components';
import { CardList } from '~/components/Card';

import { useAuthGroupsQuery } from '../queries.generated';

import GroupCard from './GroupCard';

const GroupsList: React.FC = () => {
  const queryResults = useAuthGroupsQuery();

  return (
    <ApolloQueryResults {...queryResults}>
      {({ data: { groups } }) => (
        <CardList>
          {groups.map(group => (
            <GroupCard key={group.id} group={group} />
          ))}
        </CardList>
      )}
    </ApolloQueryResults>
  );
};

export default GroupsList;
