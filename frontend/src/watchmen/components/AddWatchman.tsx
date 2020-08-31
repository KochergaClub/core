import ApolloModalFormButton from '~/components/forms/ApolloModalFormButton';
import { FormShape } from '~/components/forms/types';

import { useWatchmenCreateWatchmanMutation } from '../queries.generated';

const fields: FormShape = [
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
    default: 'FEMALE',
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
];

const AddWatchman: React.FC = () => {
  const [createMutation] = useWatchmenCreateWatchmanMutation({
    refetchQueries: ['WatchmenWatchmenList'],
    awaitRefetchQueries: true,
  });

  return (
    <div>
      <ApolloModalFormButton
        mutation={createMutation}
        shape={fields}
        modalTitle="Добавить админа"
        modalButtonName="Добавить"
        buttonName="Добавить"
      />
    </div>
  );
};

export default AddWatchman;
