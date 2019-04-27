import { hot } from 'react-hot-loader/root';

import React from 'react';

import { API } from './utils';
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

export const requestParamsToPageProps = async (
  pageName: string,
  api: API,
  params: { [key: string]: string }
) => {
  switch (pageName) {
    case 'projects/index':
      return {
        projects: await getAllProjects(api),
      };
    case 'projects/detail':
      return { project: await getProject(params.name, api) };
    default:
      return {};
  }
};
