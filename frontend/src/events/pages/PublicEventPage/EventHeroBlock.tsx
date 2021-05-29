import {
    differenceInCalendarDays, differenceInCalendarWeeks, getDate, isSameYear, parseISO
} from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import Link from 'next/link';
import React, { useCallback } from 'react';

import { formatDate, timezone } from '~/common/utils';
import { trackEvent } from '~/components/analytics';
import { HeroWithImage } from '~/components/HeroWithImage';
import CalendarIcon from '~/components/icons/CalendarIcon';
import { publicEventsRootRoute } from '~/events/routes';
import { Button, colors, Column, fonts, LabelA, Row } from '~/frontkit';
import { projectRoute } from '~/projects/routes';

import { Event_DetailsFragment } from './queries.generated';
import { CommonProps } from './types';

const getDaysUntil = (event: Event_DetailsFragment) =>
  differenceInCalendarDays(parseISO(event.start), new Date());

const CalendarIconWithDate: React.FC<{ day: number }> = ({ day }) => {
  return (
    <div className="relative">
      <CalendarIcon size={80} color={colors.grey[300]} />
      <div
        className="absolute text-5xl font-bold w-full text-center"
        style={{ top: 22 }}
      >
        {day}
      </div>
    </div>
  );
};

const DateInfo: React.FC<CommonProps> = ({ event }) => {
  const daysUntil = getDaysUntil(event);
  const date = parseISO(event.start);

  let daysText = '';

  if (daysUntil === 0) {
    daysText = 'Сегодня';
  } else if (daysUntil < 0) {
    daysText = 'Это событие прошло';
  } else if (daysUntil === 1) {
    daysText = 'Завтра';
  } else if (daysUntil === 2) {
    daysText = 'Послезавтра';
  } else if (daysUntil === 3) {
    daysText = 'Через 3 дня';
  } else if (daysUntil === 4) {
    daysText = 'Через 4 дня';
  } else if (daysUntil === 5) {
    daysText = 'Через 5 дней';
  } else if (daysUntil === 6) {
    daysText = 'Через 6 дней';
  } else {
    // more than 6 days
    const weeksUntil = differenceInCalendarWeeks(date, new Date(), {
      weekStartsOn: 1,
    });

    if (weeksUntil === 1) {
      daysText = 'На следующей неделе';
    } else if (weeksUntil === 2 || weeksUntil == 3 || weeksUntil === 4) {
      daysText = `Через ${weeksUntil} недели`;
    }
  }

  const zonedDate = utcToZonedTime(date, timezone);

  const format = `MMMM${
    isSameYear(date, new Date()) ? '' : ' yyyy'
  }, EEEE, HH:mm`;

  return (
    <time dateTime={date.toISOString()} className="flex items-end space-x-4">
      <CalendarIconWithDate day={getDate(zonedDate)} />
      <Column gutter={4}>
        <div className="uppercase font-bold sm:text-2xl">
          {formatDate(zonedDate, format)}
        </div>
        <div className="text-sm">{daysText}</div>
      </Column>
    </time>
  );
};

interface ExtraProps {
  registrationRef: React.MutableRefObject<HTMLElement | null>;
}

const Bottom: React.FC<CommonProps & ExtraProps> = ({
  event,
  registrationRef,
}) => {
  const registerCb = useCallback(() => {
    trackEvent('top_register_button', {
      category: 'events',
      label: event.title,
    });

    if (!registrationRef.current) {
      return;
    }

    window.scrollTo({
      top: registrationRef.current.offsetTop,
      behavior: 'smooth',
    });
  }, [registrationRef, event.title]);

  const daysUntil = getDaysUntil(event);

  return (
    <Column gutter={20}>
      <DateInfo event={event} />
      {daysUntil >= 0 && (
        <Row vCentered gutter={16}>
          <Button kind="primary" onClick={registerCb} style={{ flexShrink: 0 }}>
            К регистрации
          </Button>
          {event.realm === 'online' ? (
            <div
              style={{
                color: colors.grey[300],
                fontSize: fonts.sizes.XS,
              }}
            >
              Мероприятие проходит в Zoom. Участие бесплатно.
            </div>
          ) : null}
        </Row>
      )}
    </Column>
  );
};

const EventHeroBlock: React.FC<CommonProps & ExtraProps> = (props) => {
  const { event } = props;

  const imageUrl = event.image?.url || ''; // TODO - default image url?

  return (
    <HeroWithImage image={imageUrl}>
      <div className="text-white p-10 mx-auto max-w-screen-lg">
        <Link href={publicEventsRootRoute()} passHref>
          <LabelA>&larr; Все события</LabelA>
        </Link>
        {event.project ? (
          <div className="flex gap-1 mt-1">
            <div className="text-sm font-medium text-white">
              Событие проекта
            </div>
            <Link href={projectRoute(event.project.meta.slug)} passHref>
              <LabelA>{event.project.title}</LabelA>
            </Link>
          </div>
        ) : null}
        <h1 className="font-bold text-2xl sm:text-3xl md:text-5xl">
          {event.title}
        </h1>
        <Bottom {...props} />
      </div>
    </HeroWithImage>
  );
};

export default EventHeroBlock;
