import { configureStore } from './store';

it('initial state', () => {
  const store = configureStore();
  expect(store.getState()).toBeDefined();
});

it('dispatch', () => {
  const store = configureStore();
  store.dispatch({ type: 'TEST' });
  expect(store.getState()).toBeDefined();
});
