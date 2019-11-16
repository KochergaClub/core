import styled from 'styled-components';

const Unprintable = styled.div`
  @media print {
    display: none;
  }
`;

export default Unprintable;
