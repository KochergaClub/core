import { Screen } from './common/types';

import importedWagtailScreen from './wagtail/any';

export const SCREENS: { [key: string]: { default: Screen<{}> } } = {
  'analytics/index': require('./analytics/index'),
  'auth/login': require('./auth/login'),
  'auth/check-your-email': require('./auth/check-your-email'),
  'auth/magic-link': require('./auth/magic-link'),
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
  'events/event_page': require('./events/pages/event'),
  'frontpage/index': require('./frontpage/index'),
  'error-pages/400': require('./error-pages/500'), // NB - we don't have a proper 400 page yet
  'error-pages/403': require('./error-pages/403'),
  'error-pages/404': require('./error-pages/404'),
  'error-pages/500': require('./error-pages/500'),
};

export const findBasicScreen = (name: string) => {
  if (!SCREENS[name]) {
    throw new Error(`Screen ${name} not found`);
  }
  const screen = SCREENS[name].default as Screen<{}>;
  if (!screen.component) {
    throw new Error(`${name} is not a proper screen`);
  }
  return screen;
};

export const wagtailScreen = importedWagtailScreen;

export const findScreen = (name: string) => {
  if (name === 'wagtail/any') {
    return wagtailScreen;
  }
  return findBasicScreen(name);
};

// TODO: renderScreen<B> = (screen: AnyScreen<B>, context: ..., source: B)
