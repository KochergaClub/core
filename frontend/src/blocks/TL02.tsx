import { Container, TLDescription, TLHeader } from './helpers/index';

interface Props {
  title: string;
  grey?: boolean;
}

const TL02: React.FC<Props> = ({ title, grey, children }) => {
  return (
    <Container grey={grey}>
      <TLHeader size="64px">{title}</TLHeader>
      {children && <TLDescription large>{children}</TLDescription>}
    </Container>
  );
};

export default TL02;
