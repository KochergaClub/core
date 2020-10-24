import { useMutation, useQuery } from '@apollo/client';
import { Column, Label, Row } from '~/frontkit';

import { ApolloQueryResults } from '~/components';

import EventShapeDescription from '../../common/EventShapeDescription';
import EventShapeProjectLink from '../../common/EventShapeProjectLink';
import EventShapeTags from '../../common/EventShapeTags';
import EventShapeTimingDescription from '../../common/EventShapeTimingDescription';
import TimepadCategoryPicker from '../../common/TimepadCategoryPicker';
import VkGroupPicker from '../../common/VkGroupPicker';
import { Card, CardBody, CardHeader } from '../../components/Card';
import EditableString from '../../components/EditableString';
import { Header } from '../../components/ui';
import {
    EvenmanPrototypeAddTagDocument, EvenmanPrototypeDeleteTagDocument, EvenmanPrototypeDocument
} from '../queries.generated';
import ActiveStatus from './ActiveStatus';
import ExistingEvents from './ExistingEvents';
import { useUpdateMutation } from './hooks';
import Image from './Image';
import Schedule from './Schedule';
import SuggestedEvents from './SuggestedEvents';

interface Props {
  prototype_id: string;
}

const EventPrototypeCard: React.FC<Props> = ({ prototype_id }) => {
  const queryResults = useQuery(EvenmanPrototypeDocument, {
    variables: {
      id: prototype_id,
    },
  });

  const update = useUpdateMutation(prototype_id);

  const [addTag] = useMutation(EvenmanPrototypeAddTagDocument);
  const [deleteTag] = useMutation(EvenmanPrototypeDeleteTagDocument);

  return (
    <ApolloQueryResults {...queryResults}>
      {({ data: { prototype } }) => (
        <Card>
          <CardHeader>
            <Row spaced>
              <EditableString
                value={prototype.title}
                renderValue={() => <b>{prototype.title}</b>}
                save={(v) => update({ title: v })}
              />
              <ActiveStatus prototype={prototype} />
            </Row>
            <EditableString
              value={prototype.location}
              renderValue={() => prototype.location}
              save={(v) => update({ location: v })}
            />
          </CardHeader>
          <CardBody>
            <Column stretch gutter={8}>
              <section>
                <Header>Проект</Header>
                <EventShapeProjectLink
                  selected={prototype.project?.meta.slug}
                  select={async (slug) => {
                    await update({
                      project_slug: slug,
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
                  setSummary={(value) => update({ summary: value })}
                  setDescription={(value) =>
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
                  setValue={(value) =>
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
                  addTag={(tag) =>
                    addTag({ variables: { id: prototype_id, tag } })
                  }
                  deleteTag={(tag) =>
                    deleteTag({ variables: { id: prototype_id, tag } })
                  }
                />
              </section>

              <section>
                <Header>Картинки</Header>
                <Image prototype={prototype} />
              </section>

              <section>
                <Header>Timepad</Header>
                <TimepadCategoryPicker
                  code={prototype.timepad_category?.code}
                  setCode={(code) => update({ timepad_category_code: code })}
                />
              </section>

              {/*

              <section>
                <Header>Facebook</Header>
                <Label>
                  Группа для анонсов (оставьте Ø, чтобы опубликовать на главную
                  страницу).
                </Label>
                <EventShapeSocialGroups event={prototype} type="fb" />
              </section>

                */}
              <section>
                <Header>VK</Header>
                <Label>
                  Страница для анонсов (выберите kocherga_club, чтобы
                  опубликовать на главную страницу).
                </Label>
                <VkGroupPicker
                  value={prototype.vk_group?.name || ''}
                  setValue={(v) => update({ vk_group_name: v })}
                />
              </section>
            </Column>
          </CardBody>
        </Card>
      )}
    </ApolloQueryResults>
  );
};

export default EventPrototypeCard;
