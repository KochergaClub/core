import { reducer } from './types';
import moment from 'moment';

it('create from empty', () => {
  const result = reducer([], {
    type: 'CREATE',
    payload: {
      start: moment('2020-05-01 19:00'),
      end: moment('2020-05-01 21:00'),
      title: 'Some event',
      id: 'abcd',
    },
  });
  expect(result[0]).toBeTruthy();
  expect(result.length).toEqual(1);
  expect(result[0].title).toEqual('Some event');
});

it('create from non-empty', () => {
  const result = reducer(
    [
      {
        start: moment('2020-04-01 12:00').format(),
        end: moment('2020-04-01 13:00').format(),
        title: 'Older event',
        id: 'oldold',
        room: 'TODO',
      },
    ],
    {
      type: 'CREATE',
      payload: {
        start: moment('2020-05-01 19:00'),
        end: moment('2020-05-01 21:00'),
        title: 'Some event',
        id: 'abcd',
      },
    }
  );
  expect(result[0].title).toEqual('Older event');
  expect(result[1].title).toEqual('Some event');
});
