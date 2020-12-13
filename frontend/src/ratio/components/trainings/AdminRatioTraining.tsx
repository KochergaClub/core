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
import { TrainingPromocodes } from './TrainingPromocodes';
import { TrainingSchedule } from './TrainingSchedule';

export type Tab =
  | 'info'
  | 'promocodes'
  | 'ticket-types'
  | 'tickets'
  | 'schedule';

const TAB_TO_TITLE: { [k in Tab]: string } = {
  info: 'Информация',
  promocodes: 'Промокоды',
  'ticket-types': 'Типы билетов',
  tickets: 'Билеты',
  schedule: 'Расписание',
};

type Props = {
  slug: string;
  tab: Tab;
};

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
      {({ data: { training } }) => {
        const hasSchedule = training.schedule.length > 0;
        let tabNames: Tab[] = Object.keys(TAB_TO_TITLE) as Tab[];
        if (!hasSchedule) {
          tabNames = tabNames.filter((t) => t !== 'schedule');
        }

        return (
          <>
            <Head>
              <title key="title">
                {training.name} | {TAB_TO_TITLE[tab]}
              </title>
            </Head>
            <TL03 title={training.name} grey>
              {training.date}
            </TL03>
            <Page.Main>
              <PaddedBlock>
                <Column gutter={32} stretch>
                  <RowNav>
                    {tabNames.map((t) => (
                      <RowNav.Item
                        key={t}
                        selected={tab === t}
                        select={buildSelect(t)}
                      >
                        {TAB_TO_TITLE[t]}
                      </RowNav.Item>
                    ))}
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
              {tab === 'schedule' ? <TrainingSchedule slug={slug} /> : null}
            </Page.Main>
          </>
        );
      }}
    </ApolloQueryResults>
  );
};

export default AdminRatioTraining;
