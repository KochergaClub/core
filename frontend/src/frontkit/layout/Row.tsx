import styled from 'styled-components';

interface IProps {
  gutter?: number;
  stretch?: boolean;
  spaced?: boolean;
  centered?: boolean;
  vCentered?: boolean;
  wrap?: boolean;
}

export const Row = styled.div<IProps>`
  display: flex;
  flex-direction: row;

  align-items: ${props => props.vCentered ? 'center' : (props.stretch ? 'stretch' : 'flex-start')};
  ${props => props.spaced ? 'justify-content: space-between; width: 100%;' : ''}
  ${props => props.centered ? 'justify-content: center;' : ''}
  ${props => props.wrap ? 'flex-wrap: wrap;' : ''}

  & > * + * {
    margin-left: ${props => (props.gutter === undefined ? 4 : props.gutter) + 'px'};
  }
`;
