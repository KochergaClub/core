import { hot } from 'react-hot-loader/root';

import React from 'react';
import express from 'express';

import { API } from './common/api';
import { Screen, GlobalContextShape } from './common/types';
import GlobalContext from './components/GlobalContext';

const PAGES = {
  'analytics/index': require('./analytics/index'), // x
  'auth/login': require('./auth/login'), // x
  'auth/check-your-email': require('./auth/check-your-email'), // x
  'auth/registered': require('./auth/registered'), //
  'cashier/index': require('./cashier/index'), // x
  'events/index': require('./events/index'), //
  'mastermind_dating/index': require('./mastermind_dating/index'), // x
  'mastermind_dating/cohort_page': require('./mastermind_dating/cohort_page'), // x
  'my/index': require('./my/index'), // x
  'ratio/index': require('./ratio/index'), // x
  'ratio/schedule': require('./ratio/schedule'), // x
  'ratio/training': require('./ratio/training'), // x
  'staff/index_page': require('./staff/index_page'), // x
  'staff/member_page': require('./staff/member_page'), // x
  'watchmen/index': require('./watchmen/index'), // .
  'zadarma/index': require('./zadarma/index'), // x
  'zadarma/pbx_call': require('./zadarma/pbx_call'), // x
  'projects/index': require('./projects/index'), // x
  'projects/detail': require('./projects/detail'), // x
  'error-pages/403': require('./error-pages/403'), // x
  'error-pages/404': require('./error-pages/404'), // x
  'error-pages/500': require('./error-pages/500'), // x
};

interface Props {
  name: string;
  csrfToken: string;
  innerProps: any;
}

const getScreen = (name: string) => {
  if (!PAGES[name]) {
    throw new Error(`Page ${name} not found`);
  }
  const screen = PAGES[name].default as Screen;
  if (!screen.component) {
    throw new Error(`${name} is not a proper screen`);
  }
  return screen;
};

const Entrypoint = (props: Props) => {
  const screen = getScreen(props.name);
  const { component } = screen;

  const el = React.createElement(component, props.innerProps);

  return React.createElement(
    GlobalContext.Provider,
    {
      value: {
        api: new API({ csrfToken: props.csrfToken }),
      },
    },
    el
  );
};

export default hot(Entrypoint);

export const requestToPageProps = async (
  pageName: string,
  context: GlobalContextShape,
  req: express.Request
) => {
  const screen = getScreen(pageName);
  const { getInitialData } = screen;
  if (!getInitialData) {
    return {};
  }
  return await getInitialData(context, req.params, req.query);
};
