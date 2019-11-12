import { A, HR } from '@kocherga/frontkit';

import TicketsList from '../components/TicketsList';

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
