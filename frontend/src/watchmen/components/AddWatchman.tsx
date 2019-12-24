import { useCallback } from 'react';

import ModalFormButton from '~/components/forms/ModalFormButton';
import { FormShape } from '~/components/forms/types';

import { GraphQLError } from 'graphql';

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
    value: 'FEMALE',
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

interface FormResult {
  email: string;
  short_name: string;
  full_name: string;
  password: string;
  vk?: string;
  gender: string;
}

const AddWatchman: React.FC = () => {
  const [createMutation, createResults] = useWatchmenCreateWatchmanMutation({
    refetchQueries: ['WatchmenWatchmenList'],
    awaitRefetchQueries: true,
  });
  console.log(createResults);

  const cb = useCallback(
    async (values: FormResult) => {
      try {
        await createMutation({
          variables: {
            params: values,
          },
        });
        return;
      } catch (e) {
        const errors = e.graphQLErrors as GraphQLError[];
        const error = errors
          .map(
            e =>
              e.message +
              ': ' +
              JSON.stringify(e.extensions?.response?.body || 'unknown reason')
          )
          .join('. ');
        return {
          close: false,
          error,
        };
      }
    },
    [createMutation]
  );

  return (
    <div>
      <ModalFormButton
        post={cb}
        fields={fields}
        modalTitle="Добавить админа"
        modalButtonName="Добавить"
        buttonName="Добавить"
      />
    </div>
  );
};

export default AddWatchman;
