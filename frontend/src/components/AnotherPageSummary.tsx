import styled from 'styled-components';

import { A, colors } from '~/frontkit';

const Container = styled.section`
  border-bottom: 1px solid ${colors.grey[200]};
  margin-bottom: 40px;
`;

const Header = styled.header`
  margin-bottom: 4px;
`;

const Link = styled(A)`
  font-size: 24px;
`;

const Text = styled.div`
  margin-bottom: 32px;
`;

interface Props {
  href: string;
  title: string;
  description?: string;
}

const AnotherPageSummary: React.FC<Props> = ({ href, title, description }) => (
  <Container>
    <Header>
      <Link href={href}>{title}</Link>
    </Header>
    <Text>{description}</Text>
  </Container>
);

export default AnotherPageSummary;
