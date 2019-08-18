import React from 'react';
import { useSelector } from 'react-redux';

import { Column } from '@kocherga/frontkit';

import { selectTemplates } from '../selectors';

import TemplateCard from './TemplateCard';

interface Props {}

const TemplateList: React.FC<Props> = ({}) => {
  const templates = useSelector(selectTemplates);

  return (
    <Column stretch>
      {templates.map(template => (
        <TemplateCard key={template.name} template={template} />
      ))}
    </Column>
  );
};

export default TemplateList;
