import { Container, TLDescription, TLHeader } from './helpers/index';

interface Props {
  title: string;
  children?: React.ReactNode;
  grey?: boolean;
}

export default function TL02({ title, children, grey }: Props) {
  return (
    <Container grey={grey}>
      <TLHeader size="64px">{title}</TLHeader>
      {children && <TLDescription large>{children}</TLDescription>}
    </Container>
  );
}
