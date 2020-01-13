interface Props {
  typename: string;
}

export default function DebugBlock(props: Props) {
  return <pre>Блок неизвестного типа: {props.typename}</pre>;
}
