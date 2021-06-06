import { MockedResponse } from '@apollo/client/testing';

import { render } from '~/test/utils';

import { PublicEventPage } from './index';
import { Event_DetailsFragment, GetPublicEventDocument } from './queries.generated';

it('renders without crashing', async () => {
  const event: Event_DetailsFragment = {
    __typename: 'Event',
    id: 'test_id',
    start: '2020-08-01 16:00:00+00:00',
    end: '2020-08-01 18:00:00+00:00',
    title: 'Test event',
    summary: 'Test event summary',
    description: 'Test event description',
    image: null,
    realm: 'online',
    registration_type: 'native',
    pricing_type: 'free',
    project: null,
    my_ticket: null,
    announcements: {
      __typename: 'EventsAnnouncements',
      timepad: {
        __typename: 'EventsAnnouncementTimepad',
        link: '',
      },
    },
    youtube_videos: [],
  };

  const mocks: MockedResponse[] = [
    {
      request: {
        query: GetPublicEventDocument,
        variables: {
          event_id: 'test_id',
        },
      },
      result: {
        data: {
          publicEvent: event,
        },
      },
    },
  ];

  const { findByText } = render(<PublicEventPage event_id="test_id" />, {
    mocks,
  });
  await findByText('Test event');
});
