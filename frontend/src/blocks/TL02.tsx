import { Container, TLDescription, TLHeader } from './helpers/index';

interface Props {
  title: string;
  grey?: boolean;
}

export const TL02: React.FC<Props> = ({ title, grey, children }) => {
  return (
    <Container grey={grey}>
      <TLHeader size="large">{title}</TLHeader>
      {children && <TLDescription large>{children}</TLDescription>}
    </Container>
  );
};
