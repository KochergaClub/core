import React from 'react';

import { Row, Column } from '@kocherga/frontkit';

import { capitalize } from '~/common/utils';

import CreateItemButton from './CreateItemButton';
import ListView from './ListView';

import { AnyViewProps, EntityNames } from './types';

interface Props<I, A extends {}> extends AnyViewProps<I> {
  names?: EntityNames;
  add?: (addParams: A) => Promise<void>;
  view?: (props: AnyViewProps<I>) => React.ReactElement;
}

function Collection<I, A>(props: Props<I, A>) {
  const View = props.view || ListView;

  return (
    <section>
      <h2>
        <Row vCentered>
          {props.names && props.names.plural && (
            <div>{capitalize(props.names.plural)}</div>
          )}
          {props.add && (
            <CreateItemButton
              add={props.add}
              shape={props.shape}
              names={props.names}
            />
          )}
        </Row>
      </h2>
      <Column stretch>
        <View
          items={props.items}
          renderItem={props.renderItem}
          shape={props.shape}
        />
      </Column>
    </section>
  );
}

export default Collection;
