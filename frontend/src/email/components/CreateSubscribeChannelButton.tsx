import { useCallback, useMemo } from 'react';

import { useMutation, useQuery } from '@apollo/client';

import ModalFormButton from '~/components/forms/ModalFormButton';
import { FormShape } from '~/components/forms/types';

import {
    EmailMailchimpCategoriesDocument, EmailSubscribeChannelCreateDocument
} from '../queries.generated';

const CreateSubscribeChannelButton: React.FC = () => {
  const queryResults = useQuery(EmailMailchimpCategoriesDocument);
  const [createMutation] = useMutation(EmailSubscribeChannelCreateDocument, {
    refetchQueries: ['EmailSubscribeChannels'],
    awaitRefetchQueries: true,
  });

  const formShape = useMemo(() => {
    const result: FormShape = [{ name: 'slug', type: 'string' }];
    if (!queryResults.data) {
      return result;
    }

    for (const mailchimpCategory of queryResults.data.mailchimpCategories) {
      for (const mailchimpInterest of mailchimpCategory.interests) {
        result.push({
          type: 'boolean',
          name: mailchimpInterest.id,
          title: mailchimpInterest.name,
        });
      }
    }

    return result;
  }, [queryResults.data]);

  const postCb = useCallback(
    async (values: { [k: string]: string | boolean }) => {
      const slug = values.slug as string;
      const interest_ids = formShape
        .filter((field) => field.type === 'boolean')
        .filter((field) => values[field.name])
        .map((field) => field.name);

      await createMutation({
        variables: {
          params: {
            slug,
            interest_ids,
          },
        },
      });
    },
    [createMutation, formShape]
  );

  return (
    <ModalFormButton
      post={postCb}
      buttonName="Создать канал подписки"
      modalButtonName="Создать"
      modalTitle="Создать канал подписки"
      shape={formShape}
    />
  );
};

export default CreateSubscribeChannelButton;
