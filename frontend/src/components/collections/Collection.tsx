import React from 'react';

import { capitalize } from '~/common/utils';
import { FormShape, ModalPostResult, ShapeToValues } from '~/components/forms/types';
import { Column } from '~/frontkit';

import { CollectionHeader } from './CollectionHeader';
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
      <CollectionHeader
        title={capitalize(props?.names?.plural || '')}
        add={
          props.add
            ? {
                ...props.add,
                title: `Создать${
                  props.names && props.names.genitive
                    ? ' ' + props.names.genitive
                    : ''
                }`,
              }
            : undefined
        }
        refetch={props.refetch}
      />
      <Column gutter={8} stretch>
        {props.controls ? props.controls() : null}
        <div>{view({ items: props.items })}</div>
      </Column>
    </section>
  );
}

export default Collection;
