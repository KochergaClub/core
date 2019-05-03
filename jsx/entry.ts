import { hot } from 'react-hot-loader/root';

import React from 'react';

import { API } from './common/api';
import { Screen, GlobalContextShape } from './common/types';
import GlobalContext from './components/GlobalContext';

const SCREENS: { [key: string]: { default: Screen<{}> } } = {
  'analytics/index': require('./analytics/index'),
  'auth/login': require('./auth/login'),
  'auth/check-your-email': require('./auth/check-your-email'),
  'auth/registered': require('./auth/registered'), // TODO
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
  'projects/index': require('./projects/index'),
  'projects/detail': require('./projects/detail'),
  'events/event_page': require('./events/event_page'),
  'frontpage/index': require('./frontpage/index'),
  'wagtail/any': require('./wagtail/any'),
  'error-pages/403': require('./error-pages/403'),
  'error-pages/404': require('./error-pages/404'),
  'error-pages/500': require('./error-pages/500'),
};

interface Props {
  screenName: string;
  csrfToken: string;
  innerProps: any;
}

const getScreen = (name: string) => {
  if (!SCREENS[name]) {
    throw new Error(`Screen ${name} not found`);
  }
  const screen = SCREENS[name].default as Screen<{}>;
  if (!screen.component) {
    throw new Error(`${name} is not a proper screen`);
  }
  return screen;
};

const Entrypoint = (props: Props) => {
  const screen = getScreen(props.screenName);
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
  screenName: string,
  context: GlobalContextShape,
  params: object,
  query: object
) => {
  const screen = getScreen(screenName);
  const { getInitialData } = screen;
  if (!getInitialData) {
    return {};
  }
  return await getInitialData(context, params, query);
};
