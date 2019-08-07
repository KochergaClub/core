import { findBasicScreen } from './screens';
import { Screen } from './common/types';

export interface KochergaRoute {
  screen: Screen<{}>;
  path: string;
}

const route = (path: string, screenName: string) => ({
  screen: findBasicScreen(screenName),
  path,
});

export const routes: KochergaRoute[] = [
  route('/team/watchmen/', 'watchmen/index'),
  route('/team/analytics/', 'analytics/index'),
  route('/team/zadarma/', 'zadarma/index'),
  route('/team/zadarma/pbx_call/:id/', 'zadarma/pbx_call'),
  route('/team/staff/', 'staff/index_page'),
  route('/team/staff/:id/', 'staff/member_page'),
  route('/team/cashier/', 'cashier/index'),
  route('/team/kkm/', 'kkm/index'),
  route('/team/ratio/', 'ratio/index'),
  route('/team/ratio/training/:name/', 'ratio/training'),
  route('/team/ratio/training/:name/schedule/', 'ratio/schedule'),
  route('/team/mastermind_dating/', 'mastermind_dating/index'),
  route('/team/mastermind_dating/cohort/:id/', 'mastermind_dating/cohort_page'),
  route('/team/events/', 'events/index'),
  route('/projects/', 'projects/index'),
  route('/projects/:name/', 'projects/detail'),
  route('/my/', 'my/index'),
  route('/event/:id/', 'events/event_page'),
  route('/', 'frontpage/index'),
  route('/login/check-your-email', 'auth/check-your-email'),
  route('/login/magic-link', 'auth/magic-link'),
  route('/login', 'auth/login'),
  // TODO - load screens directly, remove screens.ts
  // TODO - code splitting
  // TODO - app.get('/team/', (_, res) => res.redirect(302, '/team/staff/'));
];

export const errorPages: { [k: number]: React.ComponentType } = {
  400: findBasicScreen('error-pages/400').component,
  403: findBasicScreen('error-pages/403').component,
  404: findBasicScreen('error-pages/404').component,
  500: findBasicScreen('error-pages/500').component,
};
