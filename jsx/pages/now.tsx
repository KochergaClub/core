import React from 'react';

import { NextPage } from '~/common/types';

import NowPage, { ThemeName } from '~/now/components/NowPage';

import { loadNowData } from '~/now/actions';

interface Props {
  theme: ThemeName;
}

const NPage: NextPage<Props> = ({ theme }) => <NowPage theme={theme} />;

NPage.getInitialProps = async ({ query, store: { dispatch } }) => {
  let theme: ThemeName = 'default';
  if (query.theme === 'tv') {
    theme = query.theme;
  }
  await dispatch(loadNowData());

  return { theme };
};

export default NPage;
