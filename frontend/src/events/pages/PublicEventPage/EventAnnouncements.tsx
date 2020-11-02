// import styled from 'styled-components';

// import { A } from '~/frontkit';

import { CommonProps } from './types';

// const AnnouncementsContainer = styled.div`
//   text-align: center;
//   > *:not(:last-child):after {
//     content: ' \00b7 ';
//   }
// `;

export default function EventAnnouncements({}: CommonProps) {
  // temporarily disabled
  return null;

  // return (
  //   <AnnouncementsContainer>
  //     {(['vk', 'fb', 'timepad'] as AnnouncementKey[])
  //       .filter(key => event.announcements[key])
  //       .map(key => (
  //         <span key={key}>
  //           {' '}
  //           <A href={event.announcements[key].link}>{key}</A>
  //         </span>
  //       ))}
  //   </AnnouncementsContainer>
  // );
}
