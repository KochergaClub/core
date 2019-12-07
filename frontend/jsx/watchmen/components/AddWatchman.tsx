import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { loadWatchmen } from '../actions';

import CreateButton from '~/components/crud/CreateButton';
import { FormShape } from '~/components/forms/types';

const fields: FormShape = [
  { name: 'email', type: 'email' },
  { name: 'short_name', type: 'string' },
  { name: 'full_name', type: 'string' },
  { name: 'password', type: 'password' },
  { name: 'vk', type: 'string', optional: true },
  {
    name: 'gender',
    type: 'choice',
    options: ['MALE', 'FEMALE'],
    value: 'FEMALE',
  },
];

const AddWatchman: React.FC = () => {
  const dispatch = useDispatch();

  const onCreate = useCallback(async () => {
    await dispatch(loadWatchmen());
  }, [loadWatchmen]);

  return (
    <div>
      <CreateButton
        apiEndpoint="staff/member/add_watchman"
        fields={fields}
        onCreate={onCreate}
        modalTitle="Добавить админа"
      />
    </div>
  );
};

export default AddWatchman;