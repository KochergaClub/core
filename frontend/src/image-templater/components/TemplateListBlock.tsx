import React from 'react';

import { useQuery } from '@apollo/client';

import { ApolloQueryResults, PaddedBlock } from '~/components';
import { Column } from '~/frontkit';

import { ImageTemplatesDocument } from '../queries.generated';
import TemplateCard from './TemplateCard';

export const TemplateListBlock: React.FC = () => {
  const queryResults = useQuery(ImageTemplatesDocument);

  return (
    <PaddedBlock>
      <ApolloQueryResults {...queryResults} size="block">
        {({ data: { templates } }) => (
          <Column stretch gutter={8}>
            {templates.map((template) => (
              <TemplateCard key={template.name} template={template} />
            ))}
          </Column>
        )}
      </ApolloQueryResults>
    </PaddedBlock>
  );
};
