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
  margin: 40px auto;
  padding: 0 20px;
  max-width: ${props => WIDTHS[props.width || 'normal']};
`;

export default PaddedBlock;
