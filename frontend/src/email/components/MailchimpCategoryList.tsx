import { useQuery } from '@apollo/client';

import { ApolloQueryResults } from '~/components';
import { Card, CardList } from '~/components/cards';

import { EmailMailchimpCategoriesDocument, MailchimpCategoryFragment } from '../queries.generated';

interface Props {
  mailchimpCategory: MailchimpCategoryFragment;
}

const MailchimpCategoryCard: React.FC<Props> = ({ mailchimpCategory }) => (
  <Card>
    <h3>{mailchimpCategory.title}</h3>
    <ul>
      {mailchimpCategory.interests.map((interest) => (
        <li key={interest.id}>{interest.name}</li>
      ))}
    </ul>
  </Card>
);

const MailchimpCategoryList: React.FC = () => {
  const queryResults = useQuery(EmailMailchimpCategoriesDocument);

  return (
    <div>
      <h2>Mailchimp-группы</h2>
      <ApolloQueryResults {...queryResults}>
        {({ data: { mailchimpCategories } }) => (
          <CardList>
            {mailchimpCategories.map((c) => (
              <MailchimpCategoryCard key={c.id} mailchimpCategory={c} />
            ))}
          </CardList>
        )}
      </ApolloQueryResults>
    </div>
  );
};

export default MailchimpCategoryList;
