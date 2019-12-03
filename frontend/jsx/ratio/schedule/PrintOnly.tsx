import styled from 'styled-components';

const PrintOnly = styled.div`
  display: none;
  @media print {
    display: block;
  }
`;

export default PrintOnly;
