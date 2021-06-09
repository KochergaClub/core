import Link from 'next/link';
import React from 'react';

import { NextApolloPage, withApollo } from '~/apollo';
import { HintCard, PaddedBlock, Page } from '~/components';
import { A } from '~/frontkit';

const CensusIndexPage: NextApolloPage = () => {
  return (
    <Page title="Переписи рационалистов">
      <Page.Title>Переписи рационалистов</Page.Title>
      <PaddedBlock width="small">
        <div className="mt-4 mb-8">
          <HintCard>
            Примерно раз в год мы проводим перепись русскоговорящих
            рационалистов. Это множество людей с нечёткими границами шире, чем
            сообщество Кочерги, но существенно с ним пересекается.
          </HintCard>
        </div>
        <div className="space-y-2 min-h-80">
          <div>
            <Link href="/census/2021" passHref>
              <A>Февраль 2021</A>
            </Link>
          </div>
          <div>
            <A href="https://lesswrong.ru/survey/2018/">Декабрь 2018</A> (на
            сайте lesswrong.ru)
          </div>
          <div>
            <A href="https://lesswrong.ru/survey/2016/">Декабрь 2016</A> (на
            сайте lesswrong.ru)
          </div>
          <div>
            <A href="https://lesswrong.ru/survey/2016/">Декабрь 2015</A> (на
            сайте lesswrong.ru)
          </div>
        </div>
      </PaddedBlock>
    </Page>
  );
};

export default withApollo(CensusIndexPage);
