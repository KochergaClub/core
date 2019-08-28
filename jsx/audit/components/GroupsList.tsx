import React from 'react';
import { useSelector } from 'react-redux';

import { CardList } from '~/components/Card';

import { selectGroups } from '../selectors';

import GroupCard from './GroupCard';

const GroupsList: React.FC = () => {
  const groups = useSelector(selectGroups);

  return (
    <CardList>
      {groups.map(group => (
        <GroupCard group={group} />
      ))}
    </CardList>
  );
};

export default GroupsList;
