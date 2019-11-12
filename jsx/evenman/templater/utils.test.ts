import { state2link } from './utils';

it('renders without crashing', () => {
  const link = state2link({
    name: 'foo',
    state: { key1: 'value1', key2: 'value2' },
    type: 'html',
  });
  expect(link).toBe(
    'https://kocherga.club/api/templater/foo/html?key1=value1&key2=value2'
  );
});
