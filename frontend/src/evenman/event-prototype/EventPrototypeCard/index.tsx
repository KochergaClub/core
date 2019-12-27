import React from 'react';
import { observer } from 'mobx-react-lite';

import { Column, Row, Label } from '@kocherga/frontkit';

import { Card, CardHeader, CardBody } from '../../components/Card';
import { Header, UpdatingOverlay } from '../../components/ui';

import EventShapeDescription from '../../common/EventShapeDescription';
import EventShapeTimingDescription from '../../common/EventShapeTimingDescription';
import EventShapeTimepadCategories from '../../common/EventShapeTimepadCategories';
import EventShapeTags from '../../common/EventShapeTags';
import EventShapeSocialGroups from '../../common/EventShapeSocialGroups';
import EventShapeProjectLink from '../../common/EventShapeProjectLink';

import EditableString from '../../components/EditableString';

import EventPrototype from '../../stores/EventPrototype';

import ExistingEvents from './ExistingEvents';
import ActiveStatus from './ActiveStatus';
import Schedule from './Schedule';
import SuggestedEvents from './SuggestedEvents';
import Image from './Image';

interface Props {
  prototype: EventPrototype;
}

const EventPrototypeCard: React.FC<Props> = observer(({ prototype }) => {
  return (
    <UpdatingOverlay progress={prototype.state !== 'normal'}>
      <Card>
        <CardHeader>
          <Row spaced>
            <EditableString
              value={prototype.title}
              renderValue={() => <b>{prototype.title}</b>}
              save={v => prototype.setTitle(v)}
            />
            <ActiveStatus prototype={prototype} />
          </Row>
          <EditableString
            value={prototype.location}
            renderValue={() => prototype.location}
            save={v => prototype.setLocation(v)}
          />
        </CardHeader>
        <CardBody>
          <Column stretch gutter={8}>
            <section>
              <Header>Проект</Header>
              <EventShapeProjectLink event={prototype} />
            </section>

            <section>
              <Header>Расписание</Header>
              <Schedule prototype={prototype} />
            </section>

            <SuggestedEvents prototype={prototype} />

            <section>
              <Header>Существующие мероприятия</Header>
              <ExistingEvents prototype={prototype} />
            </section>

            <section>
              <EventShapeDescription event={prototype} />
            </section>

            <section>
              <Header>Описание расписания</Header>
              <EventShapeTimingDescription event={prototype} />
            </section>

            <section>
              <Header>Теги</Header>
              <EventShapeTags event={prototype} />
            </section>

            <section>
              <Header>Картинки</Header>
              <Image prototype={prototype} />
            </section>

            <section>
              <Header>Timepad</Header>
              <EventShapeTimepadCategories event={prototype} />
            </section>

            <section>
              <Header>Facebook</Header>
              <Label>
                Группа для анонсов (оставьте Ø, чтобы опубликовать на главную
                страницу).
              </Label>
              <EventShapeSocialGroups event={prototype} type="fb" />
            </section>

            <section>
              <Header>VK</Header>
              <Label>
                Страница для анонсов (выберите kocherga_club, чтобы опубликовать
                на главную страницу).
              </Label>
              <EventShapeSocialGroups event={prototype} type="vk" />
            </section>
          </Column>
        </CardBody>
      </Card>
    </UpdatingOverlay>
  );
});

export default EventPrototypeCard;
