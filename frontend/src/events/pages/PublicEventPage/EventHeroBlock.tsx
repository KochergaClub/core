import {
    differenceInCalendarDays, differenceInCalendarWeeks, getDate, isSameYear, parseISO
} from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import Link from 'next/link';
import React, { useCallback } from 'react';
import styled from 'styled-components';

import { formatDate, timezone } from '~/common/utils';
import { trackEvent } from '~/components/analytics';
import HeroWithImage from '~/components/HeroWithImage';
import CalendarIcon from '~/components/icons/CalendarIcon';
import { publicEventsRootRoute } from '~/events/routes';
import { A, Button, colors, Column, deviceMediaQueries, fonts, LabelDiv, Row } from '~/frontkit';
import { projectRoute } from '~/projects/routes';

import { Event_DetailsFragment } from './queries.generated';
import { CommonProps } from './types';

const Container = styled.div`
  flex: 1;
  max-width: 900px;
  width: 100%;
  ${deviceMediaQueries.desktop(`
    width: 900px;
  `)}
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: white;
`;

const Header = styled.h1`
  font-weight: bold;
  font-size: ${fonts.sizes.XL5};
  line-height: 1.1;
  ${deviceMediaQueries.mobile(`
    font-size: ${fonts.sizes.XL2};
  `)}
  ${deviceMediaQueries.tablet(`
    font-size: ${fonts.sizes.XL3};
  `)}
`;

// copy-pasted from ProjectHeroBlock
const GreyA = styled(A)`
  ${fonts.label}
  color: ${colors.primary[300]};
`;

const getDaysUntil = (event: Event_DetailsFragment) =>
  differenceInCalendarDays(parseISO(event.start), new Date());

const DateInfoContainer = styled.time`
  display: flex;
  flex-direction: row;
  align-items: flex-end;

  & > * + * {
    margin-left: 16px;
  }
`;

const CalendarIconWithDateContainer = styled.div`
  position: relative;
  > svg {
    display: block;
  }
`;

const CalendarIconWithDate: React.FC<{ day: number }> = ({ day }) => {
  return (
    <CalendarIconWithDateContainer>
      <CalendarIcon size={80} color={colors.grey[300]} />
      <div
        style={{
          position: 'absolute',
          width: 80,
          textAlign: 'center',
          left: 0,
          top: 22,
          fontSize: '48px',
          fontWeight: 'bold',
          lineHeight: 1,
        }}
      >
        {day}
      </div>
    </CalendarIconWithDateContainer>
  );
};

const DateInfoText = styled.div`
  font-size: ${fonts.sizes.XL2};
  text-transform: uppercase;
  font-weight: bold;

  ${deviceMediaQueries.mobile(`
    font-size: ${fonts.sizes.BASE};
  `)}
`;

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
    <DateInfoContainer dateTime={date.toISOString()}>
      <CalendarIconWithDate day={getDate(zonedDate)} />
      <Column gutter={4}>
        <DateInfoText>{formatDate(zonedDate, format)}</DateInfoText>
        <div style={{ fontSize: fonts.sizes.SM }}>{daysText}</div>
      </Column>
    </DateInfoContainer>
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
      <Container>
        <Link href={publicEventsRootRoute()} passHref>
          <GreyA>&larr; Все события</GreyA>
        </Link>
        {event.project ? (
          <Row style={{ marginTop: '4px' }}>
            <LabelDiv style={{ color: 'white' }}>Событие проекта</LabelDiv>
            <Link href={projectRoute(event.project.meta.slug)} passHref>
              <GreyA>{event.project.title}</GreyA>
            </Link>
          </Row>
        ) : null}
        <Header>{event.title}</Header>
        <Bottom {...props} />
      </Container>
    </HeroWithImage>
  );
};

export default EventHeroBlock;
