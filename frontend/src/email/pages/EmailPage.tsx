import { withApollo, withStaff, NextApolloPage } from '~/apollo';

import { Page } from '~/components';

import SubscribeChannelList from '~/email/components/SubscribeChannelList';
import MailchimpCategoryList from '~/email/components/MailchimpCategoryList';

const EmailPage: NextApolloPage = () => {
  return (
    <Page title="Подписки" menu="team">
      <Page.Main>
        <SubscribeChannelList />
        <MailchimpCategoryList />
      </Page.Main>
    </Page>
  );
};

export default withApollo(withStaff(EmailPage));
