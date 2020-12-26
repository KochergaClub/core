import { isAfter } from 'date-fns';

import { Column } from '~/frontkit';

import EventShapeDescription from '../../common/EventShapeDescription';
import EventShapeProjectLink from '../../common/EventShapeProjectLink';
import EventShapeTimingDescription from '../../common/EventShapeTimingDescription';
import { Card, CardBody, CardHeader } from '../../components/Card';
import { Header, MutedSpan } from '../../components/ui';
import EventAnnounce from '../EventAnnounce';
import EventHeader from '../EventHeader';
import EventImages from '../EventImages';
import EventPricingType from '../EventPricingType';
import EventRealm from '../EventRealm';
import EventVisitors from '../EventVisitors';
import { useUpdateMutation } from '../hooks';
import { EvenmanEvent_DetailsFragment } from '../queries.generated';
import Publish from './Publish';
import TagEditor from './TagEditor';

interface Props {
  event: EvenmanEvent_DetailsFragment;
}

const LoadedEventCard: React.FC<Props> = ({ event }) => {
  const update = useUpdateMutation(event.id);

  const isPublic = event.event_type === 'public';

  const renderVisitors = () => {
    if (isAfter(new Date(event.start), new Date())) {
      return;
    }
    return <EventVisitors event={event} />;
  };

  return (
    <Card>
      <CardHeader>
        <EventHeader event={event} />
      </CardHeader>

      <CardBody>
        <Column stretch>
          {renderVisitors()}

          <section>
            <Header>Формат</Header>
            <EventRealm event={event} />
          </section>

          <section>
            <Header>Стоимость</Header>
            <EventPricingType event={event} />
          </section>

          <section>
            <Header>Проект</Header>
            <EventShapeProjectLink
              selected={event.project?.meta.slug}
              select={(project_slug) => update({ project_slug })}
            />
          </section>

          <section>
            <EventShapeDescription
              summary={event.summary}
              description={event.description}
              setSummary={(v) => update({ summary: v })}
              setDescription={(v) => update({ description: v })}
            />
          </section>

          <section>
            <Header>Описание расписания</Header>
            <EventShapeTimingDescription
              value={event.timing_description_override}
              setValue={(value) =>
                update({ timing_description_override: value })
              }
            />
          </section>

          <section>
            <Header>Теги</Header>
            <TagEditor event={event} />
          </section>

          {isPublic && (
            <section>
              <Header>Картинки</Header>
              <EventImages event={event} />
            </section>
          )}

          {isPublic && (
            <>
              <section>
                <Header>Публикация</Header>
                <Column>
                  <Publish event={event} />
                  {event.published ? null : (
                    <>
                      <MutedSpan>
                        Включите опцию выше, чтобы опубликовать событие на
                        сайте.
                      </MutedSpan>
                      <div style={{ height: 40 }} />
                    </>
                  )}
                </Column>
              </section>
              {event.published ? <EventAnnounce event={event} /> : null}
            </>
          )}
        </Column>
      </CardBody>
    </Card>
  );
};

export default LoadedEventCard;
