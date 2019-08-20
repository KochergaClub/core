import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';

import { A } from '@kocherga/frontkit';

import { NextPage } from '~/common/types';
import Page from '~/components/Page';

import { loadTrainings } from '~/ratio/actions';
import { selectTrainings } from '~/ratio/selectors';

const RatioIndexPage: NextPage = () => {
  const trainings = useSelector(selectTrainings);

  return (
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
};

RatioIndexPage.getInitialProps = async ({ store: { dispatch } }) => {
  await dispatch(loadTrainings());
  return {};
};

export default RatioIndexPage;
