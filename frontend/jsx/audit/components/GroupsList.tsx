import { useSelector } from 'react-redux';

import { CardList } from '~/components/Card';

import { selectGroups } from '../features/groups';

import GroupCard from './GroupCard';

const GroupsList: React.FC = () => {
  const groups = useSelector(selectGroups);

  return (
    <CardList>
      {groups.map(group => (
        <GroupCard key={group.id} group={group} />
      ))}
    </CardList>
  );
};

export default GroupsList;
