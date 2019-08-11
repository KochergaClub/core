import React from 'react';

import styled from 'styled-components';

import { A } from '@kocherga/frontkit';

import TicketsList from '../components/TicketsList';

const HR = styled.hr`
  margin: 32px 0;
  height: 1px;
  border: 0;
  border-top: 1px solid #ddd;
`;

const OtherEvents = () => (
  <div>
    <A href="/">Посмотреть ближайшие события</A>
  </div>
);

const TicketsTab = () => {
  return (
    <article>
      <TicketsList />
      <HR />
      <OtherEvents />
    </article>
  );
};

export default TicketsTab;
