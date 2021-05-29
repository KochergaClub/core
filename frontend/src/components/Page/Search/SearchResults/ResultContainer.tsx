import Link from 'next/link';
import styled from 'styled-components';

import { colors, fonts } from '~/frontkit';

const Item = styled.div`
  padding: 8px 12px;
  font-size: ${fonts.sizes.SM};
  &:hover {
    background-color: ${colors.grey[100]};
  }
`;

const LinkA = styled.a`
  color: black;
  text-decoration: none;
`;

interface Props {
  url: string;
}

const ResultContainer: React.FC<Props> = ({ url, children }) => (
  <Link href={url} passHref>
    <LinkA>
      <Item>{children}</Item>
    </LinkA>
  </Link>
);

export default ResultContainer;
