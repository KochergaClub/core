import { observer } from 'mobx-react-lite';

import { Column, Row, Label } from '@kocherga/frontkit';

import { ApolloQueryResults } from '~/components';
import { Card, CardHeader, CardBody } from '../../components/Card';
import { Header } from '../../components/ui';

import EventShapeDescription from '../../common/EventShapeDescription';
import EventShapeTimingDescription from '../../common/EventShapeTimingDescription';
import EventShapeTimepadCategories from '../../common/EventShapeTimepadCategories';
import EventShapeTags from '../../common/EventShapeTags';
import EventShapeSocialGroups from '../../common/EventShapeSocialGroups';
import EventShapeProjectLink from '../../common/EventShapeProjectLink';

import EditableString from '../../components/EditableString';

import {
  useEvenmanPrototypeQuery,
  useEvenmanPrototypeSetTitleMutation,
  useEvenmanPrototypeSetLocationMutation,
  useEvenmanPrototypeSetProjectMutation,
} from '../queries.generated';

import ExistingEvents from './ExistingEvents';
import ActiveStatus from './ActiveStatus';
import Schedule from './Schedule';
import SuggestedEvents from './SuggestedEvents';
import Image from './Image';

interface Props {
  prototype_id: string;
}

const EventPrototypeCard: React.FC<Props> = observer(({ prototype_id }) => {
  const queryResults = useEvenmanPrototypeQuery({
    variables: {
      id: prototype_id,
    },
  });

  const [setTitle] = useEvenmanPrototypeSetTitleMutation();
  const [setLocation] = useEvenmanPrototypeSetLocationMutation();
  const [setProjectMutation] = useEvenmanPrototypeSetProjectMutation();

  return (
    <ApolloQueryResults {...queryResults}>
      {({ data: { prototype } }) => (
        <Card>
          <CardHeader>
            <Row spaced>
              <EditableString
                value={prototype.title}
                renderValue={() => <b>{prototype.title}</b>}
                save={v =>
                  setTitle({ variables: { id: prototype_id, title: v } })
                }
              />
              <ActiveStatus prototype={prototype} />
            </Row>
            <EditableString
              value={prototype.location}
              renderValue={() => prototype.location}
              save={v =>
                setLocation({ variables: { id: prototype_id, location: v } })
              }
            />
          </CardHeader>
          <CardBody>
            <Column stretch gutter={8}>
              <section>
                <Header>Проект</Header>
                <EventShapeProjectLink
                  selected={prototype.project?.meta.slug}
                  select={async slug => {
                    await setProjectMutation({
                      variables: {
                        id: prototype_id,
                        project_slug: slug,
                      },
                    });
                  }}
                />
              </section>

              {/*
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
                  Страница для анонсов (выберите kocherga_club, чтобы
                  опубликовать на главную страницу).
                </Label>
                <EventShapeSocialGroups event={prototype} type="vk" />
              </section>
                */}
            </Column>
          </CardBody>
        </Card>
      )}
    </ApolloQueryResults>
  );
});

export default EventPrototypeCard;
