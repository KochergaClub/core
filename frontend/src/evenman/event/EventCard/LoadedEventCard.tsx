import { isAfter } from 'date-fns';

import { Column, Row } from '@kocherga/frontkit';

import { Header, MutedSpan } from '../../components/ui';
import { Card, CardHeader, CardBody } from '../../components/Card';

import EventShapeDescription from '../../common/EventShapeDescription';
import EventShapeTimingDescription from '../../common/EventShapeTimingDescription';
import EventShapeProjectLink from '../../common/EventShapeProjectLink';

import EventImages from '../EventImages';
import EventVisitors from '../EventVisitors';
import EventAnnounce from '../EventAnnounce';
import EventHeader from '../EventHeader';
import EventRealm from '../EventRealm';
import EventPricingType from '../EventPricingType';

import Publish from './Publish';
import TagEditor from './TagEditor';

import { EvenmanEvent_DetailsFragment } from '../queries.generated';
import { useUpdateMutation } from '../hooks';

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
              select={project_slug => update({ project_slug })}
            />
          </section>

          <section>
            <EventShapeDescription
              summary={event.summary}
              description={event.description}
              setSummary={v => update({ summary: v })}
              setDescription={v => update({ description: v })}
            />
          </section>

          <section>
            <Header>Описание расписания</Header>
            <EventShapeTimingDescription
              value={event.timing_description_override}
              setValue={value => update({ timing_description_override: value })}
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
            <section>
              <hr />
              <Row centered>
                <Publish event={event} />
              </Row>

              {event.published ? (
                <div>
                  <hr />
                  <EventAnnounce event={event} />
                </div>
              ) : (
                <Column centered>
                  <br />
                  <MutedSpan>
                    Включите опцию выше, чтобы опубликовать событие на сайте.
                  </MutedSpan>
                  <br />
                </Column>
              )}
            </section>
          )}
        </Column>
      </CardBody>
    </Card>
  );
};

export default LoadedEventCard;
