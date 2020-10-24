import styled from 'styled-components';

export const ControlsFooter = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  & > * + * {
    margin-left: 5px;
  }
`;
