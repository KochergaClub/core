import { A } from '@kocherga/frontkit';

import { withApollo } from '~/apollo/client';
import { NextPage } from '~/common/types';

import TL03 from '~/blocks/TL03';
import EventsListBlock from '~/events/components/EventsListBlock';
import { Page } from '~/components';

const PublicEventIndexPage: NextPage = () => {
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
      <EventsListBlock />
    </Page>
  );
};

export default withApollo(PublicEventIndexPage);
