import React from 'react';

import { Row, Column } from '@kocherga/frontkit';

import { FormShape } from '~/components/forms/types';

import CreateItemButton from './CreateItemButton';
import ListView from './ListView';

import { AnyViewProps } from './types';

interface Props<I, A extends {}> {
  title: string;
  entityName: string;
  shape: FormShape;
  items: I[];
  renderItem: (item: I) => React.ReactElement;
  add?: (addParams: A) => Promise<void>;
  view?: (props: AnyViewProps<I>) => React.ReactElement;
}

function Collection<I, A>(props: Props<I, A>) {
  const View = props.view || ListView;

  return (
    <section>
      <h2>
        <Row vCentered>
          <div>{props.title}</div>
          {props.add && (
            <CreateItemButton
              add={props.add}
              shape={props.shape}
              entityName={props.entityName}
            />
          )}
        </Row>
      </h2>
      <Column stretch>
        <View items={props.items} renderItem={props.renderItem} />
      </Column>
    </section>
  );
}

export default Collection;
