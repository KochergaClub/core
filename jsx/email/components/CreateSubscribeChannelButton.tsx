import React, { useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ModalFormButton from '~/components/forms/ModalFormButton';
import { FormShape } from '~/components/forms/types';

import { CreateSubscribeChannelParams } from '../types';

import { selectMailchimpInterests } from '../selectors';
import { addSubscribeChannel } from '../actions';

const CreateSubscribeChannelButton: React.FC = () => {
  const dispatch = useDispatch();
  const mailchimpInterests = useSelector(selectMailchimpInterests);

  const formShape = useMemo(() => {
    const result: FormShape = [{ name: 'slug', type: 'string' }];

    for (const mailchimpInterest of mailchimpInterests) {
      result.push({
        type: 'boolean',
        name: mailchimpInterest.interest_id,
        title: mailchimpInterest.name,
      });
    }

    return result;
  }, [mailchimpInterests]);

  const postCb = useCallback(
    async (values: { [k: string]: string | boolean }) => {
      const slug = values.slug as string;
      const interest_ids = mailchimpInterests
        .map(i => i.interest_id)
        .filter(i => values[i]);

      await dispatch(
        addSubscribeChannel({
          slug,
          interests: interest_ids,
        })
      );
    },
    [mailchimpInterests]
  );

  return (
    <ModalFormButton
      post={postCb}
      buttonName="Создать канал подписки"
      modalButtonName="Создать"
      modalTitle="Создать канал подписки"
      fields={formShape}
    />
  );
};

export default CreateSubscribeChannelButton;
