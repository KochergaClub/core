import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

import { useQuery } from '@apollo/client';

import TL03 from '~/blocks/TL03';
import { ApolloQueryResults, PaddedBlock, Page } from '~/components';
import { Column, RowNav } from '~/frontkit';
import { adminTrainingTabRoute } from '~/ratio/routes';

import { TicketTypesSection } from '../ticket-types/TicketTypesSection';
import { TrainingTicketsSection } from '../TrainingTicketsSection';
import { RatioTrainingBySlugDocument } from './queries.generated';
import { TrainingActions } from './TrainingActions';
import { TrainingInfo } from './TrainingInfo';
import { TrainingPromocodesBlock as TrainingPromocodes } from './TrainingPromocodes';

export type Tab = 'info' | 'promocodes' | 'ticket-types' | 'tickets';

interface Props {
  slug: string;
  tab: Tab;
}

const AdminRatioTraining: React.FC<Props> = ({ slug, tab }) => {
  const router = useRouter();

  const queryResults = useQuery(RatioTrainingBySlugDocument, {
    variables: { slug },
  });

  const buildSelect = (newTab: Tab) => () => {
    router.push(adminTrainingTabRoute(slug, newTab));
  };

  return (
    <ApolloQueryResults {...queryResults} size="block">
      {({ data: { training } }) => (
        <>
          <Head>
            <title key="title">{training.name}</title>
          </Head>
          <TL03 title={training.name} grey>
            {training.date}
          </TL03>
          <Page.Main>
            <PaddedBlock>
              <Column gutter={32} stretch>
                <RowNav>
                  <RowNav.Item
                    selected={tab === 'info'}
                    select={buildSelect('info')}
                  >
                    Информация
                  </RowNav.Item>
                  <RowNav.Item
                    selected={tab === 'promocodes'}
                    select={buildSelect('promocodes')}
                  >
                    Промокоды
                  </RowNav.Item>
                  <RowNav.Item
                    selected={tab === 'ticket-types'}
                    select={buildSelect('ticket-types')}
                  >
                    Виды билетов
                  </RowNav.Item>
                  <RowNav.Item
                    selected={tab === 'tickets'}
                    select={buildSelect('tickets')}
                  >
                    Билеты
                  </RowNav.Item>
                </RowNav>
                <div>
                  {(() => {
                    switch (tab) {
                      case 'info':
                        return (
                          <div>
                            <TrainingInfo training={training} />
                            <TrainingActions training={training} />
                          </div>
                        );
                      case 'promocodes':
                        return <TrainingPromocodes training={training} />;
                      case 'ticket-types':
                        return <TicketTypesSection training={training} />;
                      case 'tickets':
                        return <TrainingTicketsSection training={training} />;
                      default:
                        return null;
                    }
                  })()}
                </div>
              </Column>
            </PaddedBlock>
          </Page.Main>
        </>
      )}
    </ApolloQueryResults>
  );
};

export default AdminRatioTraining;
