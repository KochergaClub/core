import React from 'react';

import { Button, Row } from '@kocherga/frontkit';

interface Props<T extends string | number> {
  values: T[];
  current: T;
  setValue: (value: T) => void;
}

const Suggestions: <T extends string | number>(
  p: Props<T>
) => React.ReactElement<Props<T>> = props => (
  <div style={{ marginTop: 4 }}>
    <Row>
      {props.values.map(value => (
        <Button
          key={value}
          small
          onClick={() => props.setValue(value)}
          kind={props.current === value ? 'primary' : 'default'}
        >
          {value}
        </Button>
      ))}
    </Row>
  </div>
);

export default Suggestions;
