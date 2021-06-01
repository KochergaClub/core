import { Container, TLDescription, TLHeader } from './helpers/index';

interface Props {
  title: string;
  grey?: boolean;
}

export const TL03: React.FC<Props> = ({ title, grey, children }) => {
  return (
    <Container grey={grey}>
      <TLHeader size="normal">{title}</TLHeader>
      {children && <TLDescription>{children}</TLDescription>}
    </Container>
  );
};
