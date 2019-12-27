import { Column } from '@kocherga/frontkit';

import { ApolloQueryResults } from '~/components';

import TemplateCard from './TemplateCard';

import { useImageTemplatesQuery } from '../queries.generated';

const TemplateList: React.FC = () => {
  const queryResults = useImageTemplatesQuery();

  //test
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
