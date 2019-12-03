import * as React from 'react';
import { useSelector } from 'react-redux';

import Card, { CardList } from '~/components/Card';

import { selectMailchimpCategories } from '../selectors';
import { MailchimpCategory } from '../types';

const MailchimpCategoryCard: React.FC<{
  mailchimpCategory: MailchimpCategory;
}> = ({ mailchimpCategory }) => (
  <Card>
    <header>{mailchimpCategory.title}</header>
    <ul>
      {mailchimpCategory.interests.map(interest => (
        <li key={interest.interest_id}>{interest.name}</li>
      ))}
    </ul>
  </Card>
);

const MailchimpCategoryList: React.FC = () => {
  const mailchimpCategories = useSelector(selectMailchimpCategories);

  return (
    <div>
      <h2>Mailchimp-группы</h2>
      <CardList>
        {mailchimpCategories.map(c => (
          <MailchimpCategoryCard key={c.category_id} mailchimpCategory={c} />
        ))}
      </CardList>
    </div>
  );
};

export default MailchimpCategoryList;
