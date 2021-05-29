import React from 'react';

import { colors, Row } from '~/frontkit';

import { ActionContainer } from './ActionContainer';

type Props = {
  title: string;
  icon: React.ElementType;
  onClick?: () => unknown;
};

export const ActionLayout: React.FC<Props> = ({ title, icon, onClick }) => {
  const Icon = icon;
  return (
    <ActionContainer onClick={onClick}>
      <Row vCentered gutter={6}>
        <Icon color={colors.grey[400]} />
        <span>{title}</span>
      </Row>
    </ActionContainer>
  );
};
