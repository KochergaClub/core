import styled from 'styled-components';

// FIXME - copy-pasted from frontkit
const ColumnsBlock = styled.div`
  display: flex;

  max-width: 1400px;
  margin: 0 auto;

  padding: 40px 80px;

  > * {
    flex-basis: 0;
    flex-grow: 1;
  }
  > * + * {
    margin-left: 80px;
  }
`;

export default ColumnsBlock;
