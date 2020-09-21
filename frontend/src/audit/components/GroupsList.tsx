import { useQuery } from '@apollo/client';

import { ApolloQueryResults } from '~/components';
import { CardList } from '~/components/Card';

import { AuthGroupsDocument } from '../queries.generated';
import GroupCard from './GroupCard';

const GroupsList: React.FC = () => {
  const queryResults = useQuery(AuthGroupsDocument);

  return (
    <ApolloQueryResults {...queryResults}>
      {({ data: { groups } }) => (
        <CardList>
          {groups.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))}
        </CardList>
      )}
    </ApolloQueryResults>
  );
};

export default GroupsList;
