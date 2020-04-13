import Toggle from 'react-toggle';

import { A, Column, Row } from '@kocherga/frontkit';

import { Header, UpdatingOverlay, MutedSpan } from '../components/ui';
import { Card, CardHeader, CardBody } from '../components/Card';

import EventShapeDescription from '../common/EventShapeDescription';
import EventShapeTimingDescription from '../common/EventShapeTimingDescription';
import EventShapeTags from '../common/EventShapeTags';
import EventShapeProjectLink from '../common/EventShapeProjectLink';

import { EventImages } from './EventImages';
import EventVisitors from './EventVisitors';
import EventAnnounce from './EventAnnounce';
import EventHeader from './EventHeader';
import EventRealm from './EventRealm';
import EventPricingType from './EventPricingType';

import { useEvenmanEventQuery } from './queries.generated';

interface Props {
  id: string;
}

const EventCard: React.FC<Props> = ({ id }) => {
  const queryResults = useEvenmanEventQuery({
    variables: {
      id,
    },
  });

  if (!queryResults.data) {
    return <div>LOADING</div>;
  }

  const event = queryResults.data.event;

  if (!event) {
    return <div>NOT FOUND</div>;
  }

  const isPublic = event.event_type === 'public';

  return <div>TODO</div>;

  //  const renderPublished = () => {
  //    if (!isPublic) return;
  //
  //    return (
  //      <Row gutter={4}>
  //        <Toggle
  //          checked={event.published}
  //          onChange={() => event.setPublished(!event.published)}
  //        />
  //        <div>
  //          {event.published ? (
  //            <A href={`/events/${event.event_id}`}>Опубликовано</A>
  //          ) : (
  //            'Опубликовано'
  //          )}
  //        </div>
  //      </Row>
  //    );
  //  };
  //
  //  const renderVisitors = () => {
  //    if (event.moment().isAfter(moment())) {
  //      return;
  //    }
  //    return <EventVisitors event={event} />;
  //  };
  //
  //  return (
  //    <Card>
  //      <CardHeader>
  //        <EventHeader event={event} />
  //      </CardHeader>
  //
  //      <CardBody>
  //        <Column stretch>
  //          {renderVisitors()}
  //
  //          <section>
  //            <Header>Формат</Header>
  //            <EventRealm event={event} />
  //          </section>
  //
  //          <section>
  //            <Header>Стоимость</Header>
  //            <EventPricingType event={event} />
  //          </section>
  //
  //          <section>
  //            <Header>Проект</Header>
  //            <EventShapeProjectLink
  //              selected={event.project_slug}
  //              select={project => event.setProjectSlug(project)}
  //            />
  //          </section>
  //
  //          <section>
  //            <EventShapeDescription
  //              summary={event.summary}
  //              description={event.description}
  //              setSummary={v => event.setSummary(v)}
  //              setDescription={v => event.setDescription(v)}
  //            />
  //          </section>
  //
  //          <section>
  //            <Header>Описание расписания</Header>
  //            <EventShapeTimingDescription
  //              value={event.timing_description_override}
  //              setValue={value => event.setTimingDescriptionOverride(value)}
  //            />
  //          </section>
  //
  //          <section>
  //            <Header>Теги</Header>
  //            <EventShapeTags
  //              tags={event.tags}
  //              addTag={value => event.addTag(value)}
  //              deleteTag={value => event.deleteTag(value)}
  //            />
  //          </section>
  //
  //          {isPublic && (
  //            <section>
  //              <Header>Картинки</Header>
  //              <EventImages event={event} />
  //            </section>
  //          )}
  //
  //          {isPublic && (
  //            <section>
  //              <hr />
  //              <Row centered>{renderPublished()}</Row>
  //
  //              {event.published ? (
  //                <div>
  //                  <hr />
  //                  <EventAnnounce event={event} />
  //                </div>
  //              ) : (
  //                <Column centered>
  //                  <br />
  //                  <MutedSpan>
  //                    Включите опцию выше, чтобы опубликовать событие на сайте.
  //                  </MutedSpan>
  //                  <br />
  //                </Column>
  //              )}
  //            </section>
  //          )}
  //        </Column>
  //      </CardBody>
  //    </Card>
  //  );
};

export default EventCard;
