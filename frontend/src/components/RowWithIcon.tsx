import styled from 'styled-components';

import Tippy from '@tippyjs/react';

import { colors } from '~/frontkit';

const RowWithIconContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  > * + * {
    margin-left: 12px;
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface Props {
  icon: React.ElementType;
  hint: string;
}

const RowWithIcon: React.FC<Props> = ({ icon, hint, children }) => {
  const Icon = icon;
  // Note that icon needs to be wrapped until https://github.com/react-icons/react-icons/issues/336 is fixed.
  return (
    <RowWithIconContainer>
      <Tippy content={hint}>
        <IconContainer>
          <Icon size={24} color={colors.grey[400]} />
        </IconContainer>
      </Tippy>
      <div>{children}</div>
    </RowWithIconContainer>
  );
};

export default RowWithIcon;
