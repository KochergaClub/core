import React from 'react';
import { MdRefresh } from 'react-icons/md';

import { capitalize } from '~/common/utils';
import { FormShape, ModalPostResult, ShapeToValues } from '~/components/forms/types';
import { AsyncButton, Column, Row } from '~/frontkit';

import CreateItemButton from './CreateItemButton';
import DumpJSONView from './DumpJSONView';
import { EntityNames } from './types';

interface Props<I, S extends FormShape> {
  items: I[];
  names?: EntityNames;
  add?: {
    shape: S;
    cb: (values: ShapeToValues<S>) => Promise<ModalPostResult | void>;
  };
  refetch?: () => Promise<unknown>;
  view?: (props: { items: I[] }) => React.ReactNode;
  controls?: () => React.ReactNode;
}

function Collection<I, S extends FormShape>(props: Props<I, S>) {
  const view = props.view || DumpJSONView;

  return (
    <section>
      <Row vCentered gutter={8}>
        <h2>
          {props.names && props.names.plural && (
            <div>{capitalize(props.names.plural)}</div>
          )}
        </h2>
        {props.add && (
          <CreateItemButton
            add={props.add.cb}
            shape={props.add.shape}
            names={props.names}
          />
        )}
        {props.refetch && (
          <AsyncButton act={props.refetch}>
            <Row vCentered>
              <MdRefresh />
              <span>Обновить</span>
            </Row>
          </AsyncButton>
        )}
      </Row>
      <Column gutter={8} stretch>
        {props.controls ? props.controls() : null}
        <div>{view({ items: props.items })}</div>
      </Column>
    </section>
  );
}

export default Collection;
