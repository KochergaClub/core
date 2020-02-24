import React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

import moment from 'moment';
import 'moment/locale/ru';
moment.locale('ru');

import { FaGlobeAfrica, FaLock } from 'react-icons/fa';

import Toggle from 'react-toggle';

import { A, Button, Column, Row } from '@kocherga/frontkit';

import { Event, EventType } from '../stores/Event';

import { Header, UpdatingOverlay, MutedSpan } from '../components/ui';
import EditableString from '../components/EditableString';
import { Card, CardHeader, CardBody } from '../components/Card';

import EventShapeDescription from '../common/EventShapeDescription';
import EventShapeTimingDescription from '../common/EventShapeTimingDescription';
import EventShapeTags from '../common/EventShapeTags';
import EventShapeProjectLink from '../common/EventShapeProjectLink';

import { EventImages } from './EventImages';
import EventVisitors from './EventVisitors';
import EventDelete from './EventDelete';
import EventAnnounce from './EventAnnounce';
import PrototypeLink from './PrototypeLink';
import EditableMomentSpan from './EditableMomentSpan';

interface Props {
  event: Event;
}

const MomentSpan = ({ m }: { m: moment.Moment }) => (
  <span>
    <b>{m.format('ddd').toUpperCase()}</b> {m.format('D MMMM')},{' '}
    {m.format('HH:mm')}
    {' ('}
    {m.fromNow()}
    {')'}
  </span>
);

@observer
export default class EventCard extends React.Component<Props, {}> {
  @observable collapseDescription = false;

  moment() {
    return this.props.event.startMoment;
  }

  renderStart() {
    const m = this.moment();
    return (
      <EditableMomentSpan m={m} onChange={m => this.props.event.setStart(m)} />
    );
  }

  renderType() {
    const { event } = this.props;
    const translatedTypes: { [key in EventType]: string } = {
      public: 'Публичное',
      private: 'Приватное',
      unknown: 'Unknown',
    };

    if (event.type === 'unknown') {
      return (
        <Row gutter={4}>
          <div>Выберите тип:</div>
          <Button small onClick={() => event.setType('public')}>
            <FaGlobeAfrica style={{ color: 'green' }} />
          </Button>
          <Button small onClick={() => event.setType('private')}>
            <FaLock style={{ color: 'red' }} />
          </Button>
        </Row>
      );
    }

    return (
      <Row gutter={4}>
        <Toggle
          checked={event.type === 'public'}
          icons={{
            checked: <FaGlobeAfrica size={11} style={{ color: 'white' }} />,
            unchecked: <FaLock size={11} style={{ color: 'white' }} />,
          }}
          onChange={() => event.invertType()}
        />
        <div>{translatedTypes[event.type] || 'Unknown'}</div>
      </Row>
    );
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

  renderHeader() {
    const { event } = this.props;
    return (
      <Column centered>
        <Row spaced>
          <div style={{ flex: 1 }}>{this.renderType()}</div>
          <div style={{ fontSize: '1.4em' }}>
            <EditableString
              value={event.title}
              renderValue={ref => <strong ref={ref}>{event.title}</strong>}
              save={value => event.setTitle(value)}
            />
          </div>
          <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <EventDelete event={event} />
          </div>
        </Row>
        <EditableString
          value={event.location}
          renderValue={ref => <span ref={ref}>{event.location}</span>}
          save={v => event.setLocation(v)}
        />
        <Row spaced>
          <div style={{ flex: 1 }}>
            <PrototypeLink event={event} />
          </div>
          <div>{this.renderStart()}</div>
          <div
            style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'flex-end',
              alignSelf: 'flex-end',
            }}
          >
            <small>
              <MutedSpan>
                Создано: <MomentSpan m={moment(event.created)} />
              </MutedSpan>
            </small>
          </div>
        </Row>
      </Column>
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
          <CardHeader>{this.renderHeader()}</CardHeader>

          <CardBody>
            <Column stretch>
              {this.renderVisitors()}

              <section>
                <Header>Проект</Header>
                <EventShapeProjectLink event={event} />
              </section>

              <section>
                <EventShapeDescription event={event} />
              </section>

              <section>
                <Header>Описание расписания</Header>
                <EventShapeTimingDescription event={event} />
              </section>

              <section>
                <Header>Теги</Header>
                <EventShapeTags event={event} />
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
