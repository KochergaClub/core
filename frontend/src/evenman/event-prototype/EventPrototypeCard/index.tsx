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
  useEvenmanPrototypeSetProjectMutation,
  useEvenmanPrototypeAddTagMutation,
  useEvenmanPrototypeDeleteTagMutation,
} from '../queries.generated';

import { useUpdateMutation, getCacheUpdater } from './hooks';

import ExistingEvents from './ExistingEvents';
import ActiveStatus from './ActiveStatus';
import Schedule from './Schedule';
import SuggestedEvents from './SuggestedEvents';
import Image from './Image';

interface Props {
  prototype_id: string;
}

const EventPrototypeCard: React.FC<Props> = ({ prototype_id }) => {
  const queryResults = useEvenmanPrototypeQuery({
    variables: {
      id: prototype_id,
    },
  });

  const [setProject] = useEvenmanPrototypeSetProjectMutation({
    refetchQueries: ['EvenmanPrototype'],
  });
  const update = useUpdateMutation(prototype_id);

  const [addTag] = useEvenmanPrototypeAddTagMutation({
    update: getCacheUpdater(prototype_id),
  });
  const [deleteTag] = useEvenmanPrototypeDeleteTagMutation({
    update: getCacheUpdater(prototype_id),
  });

  return (
    <ApolloQueryResults {...queryResults}>
      {({ data: { prototype } }) => (
        <Card>
          <CardHeader>
            <Row spaced>
              <EditableString
                value={prototype.title}
                renderValue={() => <b>{prototype.title}</b>}
                save={v => update({ title: v })}
              />
              <ActiveStatus prototype={prototype} />
            </Row>
            <EditableString
              value={prototype.location}
              renderValue={() => prototype.location}
              save={v => update({ location: v })}
            />
          </CardHeader>
          <CardBody>
            <Column stretch gutter={8}>
              <section>
                <Header>Проект</Header>
                <EventShapeProjectLink
                  selected={prototype.project?.meta.slug}
                  select={async slug => {
                    await setProject({
                      variables: {
                        id: prototype_id,
                        project_slug: slug,
                      },
                    });
                  }}
                />
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
                <EventShapeDescription
                  summary={prototype.summary}
                  description={prototype.description}
                  setSummary={value => update({ summary: value })}
                  setDescription={value =>
                    update({
                      description: value,
                    })
                  }
                />
              </section>

              <section>
                <Header>Описание расписания</Header>
                <EventShapeTimingDescription
                  value={prototype.timing_description_override}
                  setValue={value =>
                    update({
                      timing_description_override: value,
                    })
                  }
                />
              </section>

              <section>
                <Header>Теги</Header>
                <EventShapeTags
                  tags={prototype.tags}
                  addTag={tag =>
                    addTag({ variables: { id: prototype_id, tag } })
                  }
                  deleteTag={tag =>
                    deleteTag({ variables: { id: prototype_id, tag } })
                  }
                />
              </section>

              <section>
                <Header>Картинки</Header>
                <Image prototype={prototype} />
              </section>

              {/*

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
};

export default EventPrototypeCard;
