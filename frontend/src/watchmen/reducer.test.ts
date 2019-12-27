import reducer from './reducer';
import { setEditing } from './features/editing';

it('initial state', () => {
  expect(reducer(undefined, {} as any)).toMatchObject({
    editing: false,
  });
});

it('setEditing', () => {
  expect(reducer(undefined, setEditing(true))).toMatchObject({
    editing: true,
  });

  expect(reducer(undefined, setEditing(false))).toMatchObject({
    editing: false,
  });
});
