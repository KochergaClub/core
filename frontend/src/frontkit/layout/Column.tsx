import styled from 'styled-components';

interface IProps {
  gutter?: number;
  stretch?: boolean;
  spaced?: boolean;
  centered?: boolean;
}

export const Column = styled.div<IProps>`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.centered ? 'center' : (props.stretch ? 'stretch' : 'flex-start')};
  ${props => props.spaced ? 'justify-content: space-between; height: 100%;' : ''}

  & > * + * {
    margin-top: ${props => (props.gutter === undefined ? 4 : props.gutter) + 'px'};
  }
`;
