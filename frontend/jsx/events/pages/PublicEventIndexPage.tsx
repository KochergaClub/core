import { A } from '@kocherga/frontkit';

import { NextPage } from '~/common/types';
import { formatDate } from '~/common/utils';
import { selectAPI } from '~/core/selectors';

import TL03 from '~/blocks/TL03';
import PaddedBlock from '~/components/PaddedBlock';
import EventsList from '~/events/components/EventsList';
import Page from '~/components/Page';

import { ServerPublicEvent, serverPublicEventToEvent } from '~/events/types';

export interface Props {
  events: ServerPublicEvent[];
}

const PublicEventIndexPage: NextPage<Props> = ({ events: serverEvents }) => {
  const events = serverEvents.map(serverPublicEventToEvent);

  return (
    <Page title="Расписание мероприятий">
      <TL03 title="Расписание мероприятий" grey>
        У нас 4 комнаты разного размера, так что если в какое-то время идёт
        мероприятие, это не значит, что свободных комнат нет.
        <br />
        <br />
        Если хотите забронировать комнату под день рождения, мероприятие или
        просто посиделки, звоните +7(499)350-20-42 или воспользуйтесь{' '}
        <A href="https://booking.kocherga.club">формой брони</A>.
      </TL03>
      <PaddedBlock>
        <EventsList events={events} />
      </PaddedBlock>
    </Page>
  );
};

PublicEventIndexPage.getInitialProps = async ({ store: { getState } }) => {
  const api = selectAPI(getState());

  const from_date = new Date();
  const events = (await api.call(
    `public_events?from_date=${formatDate(from_date, 'yyyy-MM-dd')}`,
    'GET'
  )) as ServerPublicEvent[];

  return { events };
};

export default PublicEventIndexPage;
