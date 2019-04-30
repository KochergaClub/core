import { hot } from 'react-hot-loader/root';

import React from 'react';

import { API } from './common/api';
import GlobalContext from './components/GlobalContext';

const PAGES = {
  'analytics/index': require('./analytics/index').default,
  'auth/login': require('./auth/login').default,
  'auth/check-your-email': require('./auth/check-your-email').default,
  'auth/registered': require('./auth/registered').default,
  'cashier/index': require('./cashier/index').default,
  'events/index': require('./events/index').default,
  'mastermind_dating/index': require('./mastermind_dating/index').default,
  'mastermind_dating/cohort_page': require('./mastermind_dating/cohort_page')
    .default,
  'my/index': require('./my/index').default,
  'ratio/index': require('./ratio/index').default,
  'ratio/schedule': require('./ratio/schedule').default,
  'ratio/training': require('./ratio/training').default,
  'staff/index_page': require('./staff/index_page').default,
  'staff/member_page': require('./staff/member_page').default,
  'watchmen/index': require('./watchmen/index').default,
  'zadarma/index': require('./zadarma/index').default,
  'zadarma/pbx_call': require('./zadarma/pbx_call').default,
  'error-pages/403': require('./error-pages/403').default,
  'error-pages/404': require('./error-pages/404').default,
  'error-pages/500': require('./error-pages/500').default,
  'projects/index': require('./projects/index').default,
  'projects/detail': require('./projects/detail').default,
};

interface Props {
  name: string;
  csrfToken: string;
  innerProps: any;
}

const Entrypoint = (props: Props) => {
  const component = PAGES[props.name];
  if (!component) {
    throw new Error(`Component ${props.name} not found`);
  }

  const el = React.createElement(component, props.innerProps);

  return React.createElement(
    GlobalContext.Provider,
    {
      value: {
        api: new API(props.csrfToken),
        foo: 'bar',
      },
    },
    el
  );
};

export default hot(Entrypoint);

import { getAllProjects, getProject } from './projects/utils'; // FIXME - generalize
import express from 'express';
import moment from 'moment';

export const requestToPageProps = async (
  pageName: string,
  api: API,
  req: express.Request
) => {
  const params = req.params;
  switch (pageName) {
    case 'projects/index':
      return {
        projects: await getAllProjects(api),
      };
    case 'projects/detail':
      return { project: await getProject(params.name, api) };
    case 'watchmen/index':
      const from_date_str = req.query.from_date;
      let from_date: moment.Moment;
      if (from_date_str) {
        from_date = moment(from_date_str);
      } else {
        from_date = moment().startOf('week');
      }
      const to_date = moment(from_date).add(4, 'weeks');

      const format = 'YYYY-MM-DD';

      return {
        schedule: await api.call(
          `watchmen/schedule?from_date=${from_date.format(
            format
          )}&to_date=${to_date.format(format)}`,
          'GET'
        ),
        editable: true, // FIXME: request.user.has_perm('watchmen.manage'),
        from_date: from_date.format('YYYY-MM-DD'),
        to_date: to_date.format('YYYY-MM-DD'),
        watchmen: await api.call('staff/member', 'GET'), // TODO - reorder - [watchman] + [non-watchman], current only
      };
    default:
      return {};
  }
};
