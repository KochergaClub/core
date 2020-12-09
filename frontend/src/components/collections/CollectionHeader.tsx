import React from 'react';
import { MdRefresh } from 'react-icons/md';

import { AsyncButton, Row } from '~/frontkit';

import { FormShapeModalButton } from '../forms';
import { FormShape, ModalPostResult, ShapeToValues } from '../forms/types';

type Props<S extends FormShape> = {
  title: string;
  add?: {
    shape: S;
    cb: (values: ShapeToValues<S>) => Promise<ModalPostResult | void>;
    title?: string;
  };
  refetch?: () => Promise<unknown>;
};

export function CollectionHeader<S extends FormShape>({
  title,
  add,
  refetch,
}: Props<S>) {
  return (
    <Row vCentered gutter={8}>
      <h2>{title}</h2>
      {add && (
        <FormShapeModalButton
          post={add.cb}
          buttonLabel="Создать"
          modalSubmitLabel="Создать"
          modalTitle={add.title || 'Создать'}
          shape={add.shape}
        />
      )}
      {refetch && (
        <AsyncButton act={refetch}>
          <Row vCentered>
            <MdRefresh />
            <span>Обновить</span>
          </Row>
        </AsyncButton>
      )}
    </Row>
  );
}
