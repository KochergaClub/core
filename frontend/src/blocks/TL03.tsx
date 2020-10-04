import { Container, TLDescription, TLHeader } from './helpers/index';

interface Props {
  title: string;
  grey?: boolean;
}

const TL03: React.FC<Props> = ({ title, grey, children }) => {
  return (
    <Container grey={grey}>
      <TLHeader size="36px">{title}</TLHeader>
      {children && <TLDescription>{children}</TLDescription>}
    </Container>
  );
};

export default TL03;
