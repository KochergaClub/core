import React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

import moment from 'moment';
import 'moment/locale/ru';
moment.locale('ru');

import Toggle from 'react-toggle';

import { A, Column, Row } from '@kocherga/frontkit';

import { Event } from '../stores/Event';

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

interface Props {
  event: Event;
}

@observer
export default class EventCard extends React.Component<Props, {}> {
  @observable collapseDescription = false;

  moment() {
    return this.props.event.startMoment;
  }

  renderPublished() {
    if (!this.props.event.isPublic) return;

    const isPublished = this.props.event.isPublished;
    return (
      <Row gutter={4}>
        <Toggle
          checked={isPublished}
          onChange={() => this.props.event.setPublished(!isPublished)}
        />
        <div>
          {isPublished ? (
            <A href={`/events/${this.props.event.id}`}>Опубликовано</A>
          ) : (
            'Опубликовано'
          )}
        </div>
      </Row>
    );
  }

  renderVisitors() {
    if (this.moment().isAfter(moment())) {
      return;
    }
    return <EventVisitors event={this.props.event} />;
  }

  render() {
    const { event } = this.props;
    return (
      <UpdatingOverlay progress={event.isLoading}>
        <Card>
          <CardHeader>
            <EventHeader event={event} />
          </CardHeader>

          <CardBody>
            <Column stretch>
              {this.renderVisitors()}

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
                  selected={event.project_slug}
                  select={project => event.setProjectSlug(project)}
                />
              </section>

              <section>
                <EventShapeDescription
                  summary={event.summary}
                  description={event.description}
                  setSummary={v => event.setSummary(v)}
                  setDescription={v => event.setDescription(v)}
                />
              </section>

              <section>
                <Header>Описание расписания</Header>
                <EventShapeTimingDescription
                  value={event.timing_description_override}
                  setValue={value => event.setTimingDescriptionOverride(value)}
                />
              </section>

              <section>
                <Header>Теги</Header>
                <EventShapeTags
                  tags={event.tags}
                  addTag={value => event.addTag(value)}
                  deleteTag={value => event.deleteTag(value)}
                />
              </section>

              {event.isPublic && (
                <section>
                  <Header>Картинки</Header>
                  <EventImages event={this.props.event} />
                </section>
              )}

              {event.isPublic && (
                <section>
                  <hr />
                  <Row centered>{this.renderPublished()}</Row>

                  {this.props.event.isPublished ? (
                    <div>
                      <hr />
                      <EventAnnounce event={this.props.event} />
                    </div>
                  ) : (
                    <Column centered>
                      <br />
                      <MutedSpan>
                        Включите опцию выше, чтобы опубликовать событие на
                        сайте.
                      </MutedSpan>
                      <br />
                    </Column>
                  )}
                </section>
              )}
            </Column>
          </CardBody>
        </Card>
      </UpdatingOverlay>
    );
  }
}
