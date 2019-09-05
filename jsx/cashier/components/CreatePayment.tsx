import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { usePermissions } from '~/common/hooks';
import ModalFormButton from '~/components/crud/ModalFormButton';
import { FormField } from '~/components/crud/types';

import { addPayment } from '../actions';
import { CreatePaymentParams } from '../types';

const fields: FormField[] = [
  { name: 'amount', type: 'number' },
  { name: 'comment', type: 'string' },
  { name: 'whom_id', type: 'number' },
];

const CreatePayment: React.FC = () => {
  const dispatch = useDispatch();
  const [canCreate] = usePermissions(['cashier.create']);

  const postCb = useCallback(
    async (values: CreatePaymentParams) => {
      await dispatch(addPayment(values));
    },
    [dispatch, addPayment]
  );

  if (!canCreate) {
    return null;
  }

  return (
    <ModalFormButton
      post={postCb}
      buttonName="Создать выплату"
      modalButtonName="Создать"
      modalTitle="Создать выплату"
      fields={fields}
    />
  );
};

export default CreatePayment;
