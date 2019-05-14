import React from 'react';

import styled from 'styled-components';

import { AnnouncementKey, PublicEvent } from '../../types';

const AnnouncementsContainer = styled.div`
  text-align: center;
  > *:not(:last-child):after {
    content: ' \00b7 ';
  }
`;

export default function EventAnnouncements({ event }: { event: PublicEvent }) {
  return (
    <AnnouncementsContainer>
      {(['vk', 'fb', 'timepad'] as AnnouncementKey[])
        .filter(key => event.announcements[key])
        .map(key => (
          <span>
            {' '}
            <a href={event.announcements[key].link}>{key}</a>
          </span>
        ))}
    </AnnouncementsContainer>
  );
}
