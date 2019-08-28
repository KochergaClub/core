import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { usePermissions } from '~/common/hooks';
import ModalFormButton from '~/components/crud/ModalFormButton';
import { FormField } from '~/components/crud/types';

import { addTraining } from '../actions';
import { CreateTrainingParams } from '../types';

const fields: FormField[] = [
  { name: 'name', type: 'string' },
  { name: 'slug', type: 'string' },
  { name: 'date', type: 'date' },
];

const AddTrainingButton = () => {
  const dispatch = useDispatch();
  const [canCreate] = usePermissions(['cashier.create']);

  const postCb = useCallback(
    async (values: CreateTrainingParams) => {
      await dispatch(addTraining(values));
    },
    [dispatch, addTraining]
  );

  if (!canCreate) {
    return null;
  }

  return (
    <ModalFormButton
      post={postCb}
      buttonName="Создать тренинг"
      modalButtonName="Создать"
      modalTitle="Создать тренинг"
      fields={fields}
    />
  );
};

export default AddTrainingButton;
