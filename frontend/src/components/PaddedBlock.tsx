import styled from 'styled-components';

interface Props {
  width?: 'small' | 'normal' | 'max';
}

const WIDTHS = {
  small: '640px',
  normal: '800px',
  max: '100%',
};

const PaddedBlock = styled.div<Props>`
  padding: 40px 20px;
  margin: 0 auto;
  max-width: ${(props) => WIDTHS[props.width || 'normal']};
`;

export default PaddedBlock;
