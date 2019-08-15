import React from 'react';
import Link from 'next/link';

import { A } from '@kocherga/frontkit';

import { NextPage } from '~/common/types';
import Page from '~/components/Page';
import { selectAPI } from '~/core/selectors';

import { Training } from '~/ratio/types';
import { getTrainings } from '~/ratio/api';

interface Props {
  trainings: Training[];
  children?: React.ReactNode;
}

const RatioIndexPage: NextPage<Props> = ({ trainings }) => (
  <Page title="Ratio" team>
    <Page.Title>Воркшопы и тренинги</Page.Title>
    <Page.Main>
      <small>
        <A href="/admin/ratio/training/add/">Добавить тренинг</A>
      </small>
      <hr />
      <ul>
        {trainings.map(training => (
          <li key={training.slug}>
            <Link
              href="/team/ratio/training/[slug]"
              as={`/team/ratio/training/${training.slug}`}
              passHref
            >
              <A>
                {training.date} {training.name}
              </A>
            </Link>
          </li>
        ))}
      </ul>
    </Page.Main>
  </Page>
);

RatioIndexPage.getInitialProps = async ({ store: { getState } }) => {
  const api = selectAPI(getState());

  const trainings = await getTrainings(api);
  return { trainings };
};

export default RatioIndexPage;
