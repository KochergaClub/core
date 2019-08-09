import React from 'react';

import { Screen } from '~/common/types';

import { Redirect } from 'react-router';

export interface KochergaRoute {
  screen: Screen<{}>;
  path: string;
}

const route = (path: string, module: { default: Screen<{}> }) => ({
  screen: module.default,
  path,
});

const redirectRoute = (from: string, to: string) => ({
  path: from,
  screen: {
    component: () => <Redirect to={to} />,
  },
});

export const routes: KochergaRoute[] = [
  route('/team/watchmen/', require('~/watchmen/index')),
  route('/team/analytics/', require('~/analytics/index')),
  route('/team/zadarma/', require('~/zadarma/index')),
  route('/team/zadarma/pbx_call/:id/', require('~/zadarma/pbx_call')),
  route('/team/staff/', require('~/staff/index_page')),
  route('/team/staff/:id/', require('~/staff/member_page')),
  route('/team/cashier/', require('~/cashier/index')),
  route('/team/kkm/', require('~/kkm/index')),
  route('/team/ratio/', require('~/ratio/pages/index')),
  route('/team/ratio/training/:name/', require('~/ratio/pages/training')),
  route(
    '/team/ratio/training/:name/schedule/',
    require('~/ratio/pages/schedule')
  ),
  route('/team/mastermind_dating/', require('~/mastermind_dating/pages/list')),
  route(
    '/team/mastermind_dating/cohort/:id/',
    require('~/mastermind_dating/pages/cohort')
  ),
  route('/team/events/', require('~/events/index')),
  route('/projects/', require('~/projects/index')),
  route('/projects/:name/', require('~/projects/detail')),
  route('/my/', require('~/my/index')),
  route('/event/:id/', require('~/events/pages/event')),
  route('/', require('~/frontpage/index')),
  route('/login/check-your-email', require('~/auth/check-your-email')),
  route('/login/magic-link', require('~/auth/magic-link')),
  route('/login', require('~/auth/login')),
  redirectRoute('/team/', '/team/staff/'),
  // TODO - code splitting
];

export const errorPages: { [k: number]: React.ComponentType } = {
  400: require('~/error-pages/500').default.component,
  403: require('~/error-pages/403').default.component,
  404: require('~/error-pages/404').default.component,
  500: require('~/error-pages/500').default.component,
};
