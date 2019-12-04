import styled from 'styled-components';

interface Props {
  width?: 'small' | 'normal';
}

const WIDTHS = {
  small: 640,
  normal: 800,
};

const PaddedBlock = styled.div<Props>`
  margin: 40px auto;
  padding: 0 20px;
  max-width: ${props => WIDTHS[props.width || 'normal']}px;
`;

export default PaddedBlock;
