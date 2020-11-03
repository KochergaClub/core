import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { useApolloClient } from '@apollo/client';

import { KochergaApolloClient } from '~/apollo/types';
import { loadWagtailPage } from '~/cms/wagtail-utils';
import { Spinner } from '~/components';
import ErrorPage from '~/error-pages/ErrorPage';

import WagtailCmsPage from './WagtailCmsPage';

// Some wagtail pages are private and can't be statically rendered.
// In this case we have to load page data on client with user's cookies and show spinner while the data is loading.
const PrivateWagtailCmsPage: React.FC = () => {
  const router = useRouter();
  const path = (router.query.slug as string[]).join('/');
  const apolloClient = useApolloClient() as KochergaApolloClient;

  // via https://stackoverflow.com/a/49889856
  type ThenArg<T> = T extends Promise<infer U> ? U : T;
  type MaybePageType = ThenArg<ReturnType<typeof loadWagtailPage>>;

  const [maybePage, setMaybePage] = useState<MaybePageType>();

  useEffect(() => {
    (async () => {
      // This effect can fire earlier than "reenable fetching on client-side" effect from withApollo HOC, so the following line is necessary:
      apolloClient.disableNetworkFetches = false;

      const maybePage = await loadWagtailPage({
        locator: { path },
        apolloClient,
      });
      setMaybePage(maybePage);
    })();
  }, [apolloClient, path]);

  if (!maybePage) {
    return <Spinner size="block" />;
  }

  switch (maybePage.kind) {
    case 'ok':
      return <WagtailCmsPage page={maybePage.page} />;
    case 'private':
      return <ErrorPage code={403} />;
  }
};

export default PrivateWagtailCmsPage;
