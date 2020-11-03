import styled from 'styled-components';

import ActionContainer from './ActionContainer';

interface Props {
  href: string;
}

export const LinkActionA = styled.a`
  color: black;
  text-decoration: none;
`;

export const LinkAction: React.FC<Props> = ({ children, href }) => {
  return (
    <LinkActionA href={href}>
      <ActionContainer>{children}</ActionContainer>
    </LinkActionA>
  );
};

export default LinkAction;
