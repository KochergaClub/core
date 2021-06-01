import React from 'react';

import { Row } from '~/frontkit';

type Props = {
  title: string;
  icon: React.ElementType;
  onClick?: () => unknown;
};

export const ActionLayout: React.FC<Props> = ({ title, icon, onClick }) => {
  const Icon = icon;
  return (
    <div className="px-3 py-2 text-sm hover:bg-gray-100" onClick={onClick}>
      <Row vCentered gutter={6}>
        <Icon className="text-gray-400" />
        <span>{title}</span>
      </Row>
    </div>
  );
};
