import Link from 'next/link';
import styled from 'styled-components';

import { fonts, colors } from '@kocherga/frontkit';
import { Route } from '~/common/types';

const Item = styled.div`
  padding: 8px 12px;
  font-size: ${fonts.sizes.S};
  &:hover {
    background-color: ${colors.grey[100]};
  }
`;

const LinkA = styled.div`
  color: black;
  text-decoration: none;
`;

interface Props {
  route: Route;
}

const ResultContainer: React.FC<Props> = ({ route, children }) => (
  <Link {...route} passHref>
    <LinkA>
      <Item>{children}</Item>
    </LinkA>
  </Link>
);

export default ResultContainer;
