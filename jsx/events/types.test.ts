import { reducer } from './types';
import moment from 'moment';

it('create from empty', () => {
  const result = reducer(
    { events: [] },
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
  expect(result.events[0]).toBeTruthy();
  expect(result.events.length).toEqual(1);
  expect(result.events[0].title).toEqual('Some event');
});

it('create from non-empty', () => {
  const result = reducer(
    {
      events: [
        {
          start: moment('2020-04-01 12:00').format(),
          end: moment('2020-04-01 13:00').format(),
          title: 'Older event',
          id: 'oldold',
          room: 'TODO',
        },
      ],
    },
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
  expect(result.events[0].title).toEqual('Older event');
  expect(result.events[1].title).toEqual('Some event');
});

it('REPLACE_ALL action', () => {
  const result = reducer(
    {
      events: [
        {
          start: moment('2020-04-01 12:00').format(),
          end: moment('2020-04-01 13:00').format(),
          title: 'First event',
          id: 'first',
          room: 'TODO',
        },
        {
          start: moment('2020-04-01 12:00').format(),
          end: moment('2020-04-01 13:00').format(),
          title: 'Second event',
          id: 'second',
          room: 'TODO',
        },
      ],
    },
    {
      type: 'REPLACE_ALL',
      payload: {
        events: [
          {
            start: moment('2020-04-01 12:00').format(),
            end: moment('2020-04-01 13:00').format(),
            title: 'Third event',
            id: 'third',
            room: 'TODO',
          },
          {
            start: moment('2020-04-01 12:00').format(),
            end: moment('2020-04-01 13:00').format(),
            title: 'Fourth event',
            id: 'fourth',
            room: 'TODO',
          },
        ],
      },
    }
  );
  expect(result.events.length).toEqual(2);
  expect(result.events[0].title).toEqual('Third event');
  expect(result.events[1].title).toEqual('Fourth event');
});
