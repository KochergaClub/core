import { useCallback, useMemo } from 'react';

import { useMutation, useQuery } from '@apollo/client';

import ModalFormButton from '~/components/forms/ModalFormButton';
import { FieldShape } from '~/components/forms/types';

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
    const result: FieldShape[] = [{ name: 'slug', type: 'string' }];
    if (!queryResults.data) {
      return result;
    }

    for (const mailchimpCategory of queryResults.data.mailchimpCategories) {
      const subShape: FieldShape[] = [];
      for (const mailchimpInterest of mailchimpCategory.interests) {
        subShape.push({
          type: 'boolean',
          name: mailchimpInterest.id,
          title: mailchimpInterest.name,
        });
      }
      result.push({
        type: 'shape',
        name: mailchimpCategory.id,
        title: mailchimpCategory.title,
        shape: subShape,
      });
    }

    return result;
  }, [queryResults.data]);

  const postCb = useCallback(
    async (values: { [k: string]: string | { [k: string]: boolean } }) => {
      console.log(values);
      const interest_ids = [];
      const slug = values.slug as string;

      for (const field of formShape) {
        if (field.type !== 'shape') {
          continue;
        }
        for (const subField of field.shape) {
          if (subField.type !== 'boolean') {
            continue;
          }
          if ((values[field.name] as { [k: string]: boolean })[subField.name]) {
            interest_ids.push(subField.name);
          }
        }
      }

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
