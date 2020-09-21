import { useQuery } from '@apollo/client';
import { Column } from '@kocherga/frontkit';

import { ApolloQueryResults } from '~/components';

import { ImageTemplatesDocument } from '../queries.generated';
import TemplateCard from './TemplateCard';

const TemplateList: React.FC = () => {
  const queryResults = useQuery(ImageTemplatesDocument);

  return (
    <ApolloQueryResults {...queryResults}>
      {({ data: { templates } }) => (
        <Column stretch>
          {templates.map(template => (
            <TemplateCard key={template.name} template={template} />
          ))}
        </Column>
      )}
    </ApolloQueryResults>
  );
};

export default TemplateList;
