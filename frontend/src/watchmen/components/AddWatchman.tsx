import { useMutation } from '@apollo/client';

import { MutationModalButton } from '~/components/forms';

import { WatchmenCreateWatchmanDocument } from '../queries.generated';

const fields = [
  { name: 'email', type: 'email' },
  { name: 'short_name', type: 'string' },
  { name: 'full_name', type: 'string' },
  { name: 'password', type: 'password' },
  { name: 'vk', type: 'string', optional: true },
  {
    name: 'gender',
    type: 'choice',
    options: [
      ['MALE', 'М'],
      ['FEMALE', 'Ж'],
    ],
  },
  { name: 'skip_wiki', title: 'Не добавлять на вики', type: 'boolean' },
  {
    name: 'skip_cm_customer',
    title: 'Не проверять клиента в КМ',
    type: 'boolean',
  },
  {
    name: 'skip_cm_user',
    title: 'Не добавлять пользователя в КМ',
    type: 'boolean',
  },
] as const;

const AddWatchman: React.FC = () => {
  const [createMutation] = useMutation(WatchmenCreateWatchmanDocument, {
    refetchQueries: ['WatchmenWatchmenList'],
    awaitRefetchQueries: true,
  });

  return (
    <div>
      <MutationModalButton
        mutation={createMutation}
        shape={fields}
        defaultValues={{
          gender: 'FEMALE',
        }}
        modalTitle="Добавить админа"
        modalButtonName="Добавить"
        buttonName="Добавить"
      />
    </div>
  );
};

export default AddWatchman;
