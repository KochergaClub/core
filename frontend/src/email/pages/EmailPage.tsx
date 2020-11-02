import { NextApolloPage, withApollo, withStaff } from '~/apollo';
import { Page } from '~/components';
import MailchimpCategoryList from '~/email/components/MailchimpCategoryList';
import SubscribeChannelList from '~/email/components/SubscribeChannelList';

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
