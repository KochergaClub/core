import Card, { CardList } from '~/components/Card';
import { ApolloQueryResults } from '~/components';

import {
  useEmailMailchimpCategoriesQuery,
  MailchimpCategoryFragment,
} from '../queries.generated';

interface Props {
  mailchimpCategory: MailchimpCategoryFragment;
}

const MailchimpCategoryCard: React.FC<Props> = ({ mailchimpCategory }) => (
  <Card>
    <header>{mailchimpCategory.title}</header>
    <ul>
      {mailchimpCategory.interests.map(interest => (
        <li key={interest.id}>{interest.name}</li>
      ))}
    </ul>
  </Card>
);

const MailchimpCategoryList: React.FC = () => {
  const queryResults = useEmailMailchimpCategoriesQuery();

  return (
    <div>
      <h2>Mailchimp-группы</h2>
      <ApolloQueryResults {...queryResults}>
        {({ data: { mailchimpCategories } }) => (
          <CardList>
            {mailchimpCategories.map(c => (
              <MailchimpCategoryCard key={c.id} mailchimpCategory={c} />
            ))}
          </CardList>
        )}
      </ApolloQueryResults>
    </div>
  );
};

export default MailchimpCategoryList;
