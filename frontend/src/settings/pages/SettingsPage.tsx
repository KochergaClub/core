import React from 'react';

import { useQuery } from '@apollo/client';

import { NextApolloPage, withApollo } from '~/apollo';
import { requireAuth } from '~/auth/utils';
import { ApolloQueryResults, PaddedBlock, Page } from '~/components';
import { A, Column } from '~/frontkit';

import {
    GlobalSettingsDocument, WagtailCollection_ForSettingsFragment as CollectionFragment
} from '../queries.generated';

const CollectionLink: React.FC<{ collection: CollectionFragment }> = ({
  collection,
}) => {
  return (
    <div>
      <A href={`/wagtail/collections/${collection.id}/`}>{collection.name}</A>
    </div>
  );
};

const MaybeCollectionLink: React.FC<{
  collection?: CollectionFragment | null;
}> = ({ collection }) => {
  if (!collection) {
    return (
      <div>
        <em>Коллекция не настроена.</em>
      </div>
    );
  }
  return <CollectionLink collection={collection} />;
};

const SettingsPage: NextApolloPage = () => {
  const queryResults = useQuery(GlobalSettingsDocument);

  return (
    <Page title="Глобальные настройки" menu="team">
      <Page.Title>Глобальные настройки</Page.Title>
      <Page.Main>
        <PaddedBlock>
          <small>
            Настройки пока что можно поменять через прямое обновление базы или
            вызов GraphQL mutation updateSettings вручную.
          </small>
          <ApolloQueryResults {...queryResults}>
            {({ data: { settings } }) => (
              <Column>
                <section>
                  <h2>Умолчальная коллекция для картинок событий</h2>
                  <MaybeCollectionLink
                    collection={settings.default_events_images_collection}
                  />
                </section>
                <section>
                  <h2>
                    Умолчальная коллекция для сгенерированных ВК-картинок
                    событий
                  </h2>
                  <MaybeCollectionLink
                    collection={settings.default_events_vk_images_collection}
                  />
                </section>
                <section>
                  <h2>
                    Коллекция для сгенерированных картинок еженедельных
                    дайджестов событий
                  </h2>
                  <MaybeCollectionLink
                    collection={settings.weekly_digest_images_collection}
                  />
                </section>
                <section>
                  <h2>Коллекция для скачанных картинок Телеграм-чатов</h2>
                  <MaybeCollectionLink
                    collection={settings.telegram_images_collection}
                  />
                </section>
              </Column>
            )}
          </ApolloQueryResults>
        </PaddedBlock>
      </Page.Main>
    </Page>
  );
};

SettingsPage.getInitialProps = async (ctx) => {
  const { apolloClient } = ctx;

  await requireAuth(apolloClient, { is_superuser: true });

  return {};
};

export default withApollo(SettingsPage);
