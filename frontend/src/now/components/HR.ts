import styled from 'styled-components';

const HR = styled.hr`
  border: 0;
  width: 100%;
  height: 1px;
  background-color: #999;
  margin-top: 50px;
  margin-bottom: 50px;

  ${props => (props.theme.tv ? 'display: none;' : '')}
`;

export default HR;
