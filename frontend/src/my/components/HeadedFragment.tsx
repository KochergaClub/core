import styled from 'styled-components';

const Header = styled.h3`
  /* text-align: center; */
`;

const Container = styled.div`
  margin-bottom: 40px;
`;

interface Props {
  title: string;
}

const HeadedFragment: React.FC<Props> = ({ title, children }) => {
  return (
    <Container>
      <Header>{title}</Header>
      {children}
    </Container>
  );
};

export default HeadedFragment;
