import React from 'react';
import { MdRefresh } from 'react-icons/md';

import { capitalize } from '~/common/utils';
import { AnyFormValues, FormShape } from '~/components/forms/types';
import { Column, Row } from '~/frontkit';

import { AsyncButton } from '../';
import CreateItemButton from './CreateItemButton';
import DumpJSONView from './DumpJSONView';
import { AnyViewProps, EntityNames } from './types';

interface Props<I, A extends AnyFormValues> {
  items: I[];
  names?: EntityNames;
  add?: {
    shape: FormShape;
    cb: (values: A) => Promise<void>;
  };
  refetch?: () => Promise<unknown>;
  view?: React.ElementType<AnyViewProps<I>>;
}

function Collection<I, A extends AnyFormValues>(props: Props<I, A>) {
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
      <Column stretch>
        <View items={props.items} />
      </Column>
    </section>
  );
}

export default Collection;
