import { useCallback, useMemo } from 'react';

import { useMutation, useQuery } from '@apollo/client';

import { FormShapeModalButton } from '~/components/forms';
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
    async (values: Record<string, unknown>) => {
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
    <FormShapeModalButton
      post={postCb}
      buttonLabel="Создать канал подписки"
      modalSubmitLabel="Создать"
      modalTitle="Создать канал подписки"
      shape={formShape}
    />
  );
};

export default CreateSubscribeChannelButton;
