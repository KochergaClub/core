import { FaArrowRight } from 'react-icons/fa';
import styled from 'styled-components';

import { ActionLayout } from './ActionLayout';
import { CommonActionProps } from './types';

interface Props extends CommonActionProps {
  href: string;
  children?: null;
}

export const LinkActionA = styled.a`
  color: black;
  text-decoration: none;
`;

export const LinkAction: React.FC<Props> = ({ href, icon, title }) => {
  return (
    <LinkActionA href={href}>
      <ActionLayout title={title} icon={icon || FaArrowRight} />
    </LinkActionA>
  );
};

export default LinkAction;
