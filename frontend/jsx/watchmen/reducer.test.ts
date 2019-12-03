import reducer from './reducer';
import * as actions from './actions';
import { Shift } from './types';

it('initial state', () => {
  expect(reducer(undefined, {} as any)).toMatchObject({
    editing: false,
  });
});

it('setEditing', () => {
  expect(reducer(undefined, actions.setEditing(true))).toMatchObject({
    editing: true,
  });

  expect(reducer(undefined, actions.setEditing(false))).toMatchObject({
    editing: false,
  });
});

it('replaceSchedule', () => {
  const s1 = {
    date: '2019-04-01',
    shift: 'MORNING',
    watchman: null,
    is_night: false,
  } as Shift;
  const s2 = {
    date: '2019-04-01',
    shift: 'NIGHT',
    watchman: null,
    is_night: false,
  } as Shift;

  expect(
    reducer(undefined, actions.replaceSchedule({ '2019-04-01': [s1, s2] }))
  ).toMatchObject({
    schedule: { '2019-04-01': [s1, s2] },
  });
});
