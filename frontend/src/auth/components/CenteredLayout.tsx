import styled from 'styled-components';

const CenteredLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  margin-bottom: 100px;

  > * + * {
    margin-top: 100px;
  }
`;

export default CenteredLayout;
