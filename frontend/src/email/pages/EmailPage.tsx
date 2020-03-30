import { withApollo } from '~/apollo/client';
import { withStaff } from '~/apollo/withStaff';
import { NextPage } from '~/common/types';

import { Page } from '~/components';

import SubscribeChannelList from '~/email/components/SubscribeChannelList';
import MailchimpCategoryList from '~/email/components/MailchimpCategoryList';

interface Props {}

const EmailPage: NextPage<Props> = ({}) => {
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
