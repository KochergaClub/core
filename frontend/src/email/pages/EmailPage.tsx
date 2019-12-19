import { NextPage } from '~/common/types';
import Page from '~/components/Page';

import { loadSubscribeChannels } from '~/email/features/subscribeChannels';
import { loadMailchimpCategories } from '~/email/features/mailchimpCategories';

import SubscribeChannelList from '~/email/components/SubscribeChannelList';
import MailchimpCategoryList from '~/email/components/MailchimpCategoryList';

interface Props {}

const EmailPage: NextPage<Props> = ({}) => {
  return (
    <Page title="Подписки" team>
      <Page.Main>
        <SubscribeChannelList />
        <MailchimpCategoryList />
      </Page.Main>
    </Page>
  );
};

EmailPage.getInitialProps = async ({ store: { dispatch } }) => {
  await dispatch(loadSubscribeChannels());
  await dispatch(loadMailchimpCategories());
  return {};
};

export default EmailPage;
