import { reducer } from './types';

it('create from empty', () => {
  const result = reducer(
    { events: [] },
    {
      type: 'CREATE',
      payload: {
        start: new Date('2020-05-01 19:00'),
        end: new Date('2020-05-01 21:00'),
        title: 'Some event',
        description: '',
        id: 'abcd',
        room: 'r',
        type: 'private',
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
          start: new Date('2020-04-01 12:00'),
          end: new Date('2020-04-01 13:00'),
          title: 'Older event',
          description: '',
          id: 'oldold',
          room: 'TODO',
          type: 'private',
        },
      ],
    },
    {
      type: 'CREATE',
      payload: {
        start: new Date('2020-05-01 19:00'),
        end: new Date('2020-05-01 21:00'),
        title: 'Some event',
        description: '',
        id: 'abcd',
        room: 'r',
        type: 'private',
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
          start: new Date('2020-04-01 12:00'),
          end: new Date('2020-04-01 13:00'),
          title: 'First event',
          description: '',
          id: 'first',
          room: 'TODO',
          type: 'private',
        },
        {
          start: new Date('2020-04-01 12:00'),
          end: new Date('2020-04-01 13:00'),
          title: 'Second event',
          description: '',
          id: 'second',
          room: 'TODO',
          type: 'private',
        },
      ],
    },
    {
      type: 'REPLACE_ALL',
      payload: {
        events: [
          {
            start: new Date('2020-04-01 12:00'),
            end: new Date('2020-04-01 13:00'),
            title: 'Third event',
            description: '',
            id: 'third',
            room: 'TODO',
            type: 'private',
          },
          {
            start: new Date('2020-04-01 12:00'),
            end: new Date('2020-04-01 13:00'),
            title: 'Fourth event',
            description: '',
            id: 'fourth',
            room: 'TODO',
            type: 'private',
          },
        ],
      },
    }
  );

  expect(result.events.length).toEqual(2);
  expect(result.events[0].title).toEqual('Third event');
  expect(result.events[1].title).toEqual('Fourth event');
});
