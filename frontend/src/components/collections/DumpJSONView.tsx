import { Card, CardList } from '~/components/cards';

import { AnyViewProps } from './types';

function DumpJSONView<I>(props: AnyViewProps<I>) {
  return (
    <CardList>
      {props.items.map((item, i) => {
        return (
          <Card key={i}>
            <code> {JSON.stringify(item)} </code>
          </Card>
        );
      })}
    </CardList>
  );
}

export default DumpJSONView;
