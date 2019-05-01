import { hot } from 'react-hot-loader/root';

import React from 'react';

import { API } from './common/api';
import GlobalContext from './components/GlobalContext';

const PAGES = {
  'analytics/index': require('./analytics/index'),
  'auth/login': require('./auth/login'),
  'auth/check-your-email': require('./auth/check-your-email'),
  'auth/registered': require('./auth/registered'),
  'cashier/index': require('./cashier/index'),
  'events/index': require('./events/index'),
  'mastermind_dating/index': require('./mastermind_dating/index'),
  'mastermind_dating/cohort_page': require('./mastermind_dating/cohort_page'),
  'my/index': require('./my/index'),
  'ratio/index': require('./ratio/index'),
  'ratio/schedule': require('./ratio/schedule'),
  'ratio/training': require('./ratio/training'),
  'staff/index_page': require('./staff/index_page'),
  'staff/member_page': require('./staff/member_page'),
  'watchmen/index': require('./watchmen/index'),
  'zadarma/index': require('./zadarma/index'),
  'zadarma/pbx_call': require('./zadarma/pbx_call'),
  'error-pages/403': require('./error-pages/403'),
  'error-pages/404': require('./error-pages/404'),
  'error-pages/500': require('./error-pages/500'),
  'projects/index': require('./projects/index'),
  'projects/detail': require('./projects/detail'),
};

interface Props {
  name: string;
  csrfToken: string;
  innerProps: any;
}

const Entrypoint = (props: Props) => {
  const component = PAGES[props.name].default;
  if (!component) {
    throw new Error(`Component ${props.name} not found`);
  }

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

import express from 'express';

export const requestToPageProps = async (
  pageName: string,
  api: API,
  req: express.Request
) => {
  const getInitialData = PAGES[pageName].getInitialData;
  if (!getInitialData) {
    return {};
  }
  return await getInitialData(api, req.params, req.query);
};
