import { Selector } from 'reselect';

import { State } from '~/redux/store';

export const selectKkmPassword: Selector<State, string | undefined> = state =>
  state.kkm.password;
