import store from './store';

it('initial state', () => {
  expect(store.getState()).toBeDefined();
});

it('dispatch', () => {
  store.dispatch({ type: 'TEST' });
  expect(store.getState()).toBeDefined();
});
