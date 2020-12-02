import React from 'react';
import { MdRefresh } from 'react-icons/md';

import { capitalize } from '~/common/utils';
import { FormShape, ModalPostResult, ShapeToValues } from '~/components/forms/types';
import { AsyncButton, Row } from '~/frontkit';

import CreateItemButton from './CreateItemButton';
import DumpJSONView from './DumpJSONView';
import { AnyViewProps, EntityNames } from './types';

interface Props<I, S extends FormShape> {
  items: I[];
  names?: EntityNames;
  add?: {
    shape: S;
    cb: (values: ShapeToValues<S>) => Promise<ModalPostResult | void>;
  };
  refetch?: () => Promise<unknown>;
  view?: React.ElementType<AnyViewProps<I>>;
}

function Collection<I, S extends FormShape>(props: Props<I, S>) {
  const View = props.view || DumpJSONView;

  return (
    <section>
      <h2>
        <Row vCentered gutter={8}>
          {props.names && props.names.plural && (
            <div>{capitalize(props.names.plural)}</div>
          )}
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
      </h2>
      <div>
        <View items={props.items} />
      </div>
    </section>
  );
}

export default Collection;
