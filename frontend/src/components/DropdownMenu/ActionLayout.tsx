import React from 'react';

import { Row } from '~/frontkit';

type Props = {
  title: string;
  icon: React.ElementType<{ className?: string }>;
  onClick?: () => unknown;
};

export const ActionLayout: React.FC<Props> = ({ title, icon, onClick }) => {
  const Icon = icon;
  return (
    <div
      className="group px-3 py-2 text-sm hover:bg-gray-100"
      onClick={onClick}
    >
      <Row vCentered gutter={6}>
        <Icon className="text-gray-400 group-hover:text-gray-600" />
        <span>{title}</span>
      </Row>
    </div>
  );
};
