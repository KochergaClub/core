import dynamic from 'next/dynamic';
import { useCallback } from 'react';

import { useMutation } from '@apollo/client';

import { NextApolloPage, withApollo } from '~/apollo';
import { requireAuth } from '~/auth/utils';
import { Page } from '~/components';

import { OpenviduGenerateRoomTokenDocument } from '../queries.generated';

const OpenViduApp = dynamic(() => import('~/openvidu/OpenViduApp'), {
  ssr: false,
});

const MyEventPage: NextApolloPage = () => {
  const title = 'Открытая комната (альфа-версия)';
  const [generateTokenMutation] = useMutation(OpenviduGenerateRoomTokenDocument);

  const getToken = useCallback(async () => {
    const { data } = await generateTokenMutation();
    if (!data || !data.result) {
      throw Error('Failed to obtain token');
    }
    return data.result.token;
  }, [generateTokenMutation]);

  return (
    <Page title={title}>
      <Page.Title>{title}</Page.Title>
      <Page.Main wide>
        <OpenViduApp getToken={getToken} />
      </Page.Main>
    </Page>
  );
};

MyEventPage.getInitialProps = async ({ apolloClient }) => {
  await requireAuth(apolloClient, { is_authenticated: true });
  return {};
};

export default withApollo(MyEventPage);
