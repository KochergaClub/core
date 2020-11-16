import { Button, Row } from '~/frontkit';

interface Props<T extends string | number> {
  values: T[];
  labels?: Record<T, string>;
  current: T;
  setValue: (value: T) => void;
}

const Suggestions: <T extends string | number>(
  p: Props<T>
) => React.ReactElement<Props<T>> = (props) => (
  <div style={{ marginTop: 4 }}>
    <Row wrap={true}>
      {props.values.map((value) => (
        <Button
          key={value}
          type="button"
          size="small"
          onClick={() => props.setValue(value)}
          kind={props.current === value ? 'primary' : 'default'}
        >
          {props.labels ? props.labels[value] : value}
        </Button>
      ))}
    </Row>
  </div>
);

export default Suggestions;
