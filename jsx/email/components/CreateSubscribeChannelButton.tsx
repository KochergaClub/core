import React, { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';

import ModalFormButton from '~/components/forms/ModalFormButton';
import { FormShape } from '~/components/forms/types';

import { selectMailchimpCategories } from '../selectors';

const CreateSubscribeChannelButton: React.FC = () => {
  const mailchimpCategories = useSelector(selectMailchimpCategories);

  const formShape = useMemo(() => {
    const result: FormShape = [{ name: 'slug', type: 'string' }];

    for (const mailchimpCategory of mailchimpCategories) {
      for (const mailchimpInterest of mailchimpCategory.interests) {
        result.push({
          type: 'boolean',
          name: mailchimpInterest.interest_id,
          title: mailchimpInterest.name,
        });
      }
    }

    return result;
  }, [mailchimpCategories]);

  const postCb = useCallback(async (values: any) => {
    // TODO - call API with checked interests
    window.alert('Not implemented. ' + JSON.stringify(values));
  }, []);

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
