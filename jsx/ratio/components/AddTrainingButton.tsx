import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { usePermissions } from '~/common/hooks';
import ModalFormButton from '~/components/forms/ModalFormButton';
import { FormShape } from '~/components/forms/types';

import { addTraining } from '../actions';
import { CreateTrainingParams } from '../types';

const fields: FormShape = [
  { name: 'name', type: 'string' },
  { name: 'slug', type: 'string' },
  { name: 'date', type: 'date' },
];

const AddTrainingButton = () => {
  const dispatch = useDispatch();
  const [canCreate] = usePermissions(['ratio.manage']);

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
