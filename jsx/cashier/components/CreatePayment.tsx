import React, { useCallback } from 'react';

import { useAPI, usePermissions } from '~/common/hooks';
import AsyncButton from '~/components/AsyncButton';

import { createPayment } from '../api';

const CreatePayment = () => {
  const api = useAPI();
  const [canCreate] = usePermissions(['cashier.create']);

  const createTestPayment = useCallback(async () => {
    await createPayment(api, {
      amount: 5000,
      comment: 'test comment',
      whom: 'me@berekuk.ru',
    });
  }, [api]);

  if (!canCreate) {
    return null;
  }

  return (
    <AsyncButton act={createTestPayment}>Создать тестовую выплату</AsyncButton>
  ); // TODO - implement real payments
};

export default CreatePayment;
