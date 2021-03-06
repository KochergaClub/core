import { useCallback } from 'react';

import styled from 'styled-components';

import {
  differenceInCalendarDays,
  differenceInCalendarWeeks,
  parseISO,
} from 'date-fns';

import { Button, Label, fonts, deviceMediaQueries } from '~/frontkit';

import { trackEvent } from '~/components/analytics';

import HumanizedDateTime from '~/components/HumanizedDateTime';
import HeroWithImage from '~/components/HeroWithImage';
import HeroHeader from '~/components/HeroHeader';

import { CommonProps } from './types';

// TODO - redo with grid layout
const Container = styled.div`
  min-height: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  padding: 24px;
`;

const HeroTopLink = styled.a`
  text-decoration: none;
`;

const HeroLabel = styled(Label)`
  color: white;
  cursor: pointer;
`;

const BottomRowContainer = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  width: 100%;

  color: white;

  ${deviceMediaQueries.desktop(`
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      font-size: ${fonts.sizes.L};
    `)}

  > :first-child,
  > :last-child {
    flex: 1;
    text-align: center;
  }
`;

interface ExtraProps {
  registrationRef: React.MutableRefObject<HTMLElement | null>;
}

const BottomRow: React.FC<CommonProps & ExtraProps> = ({
  event,
  registrationRef,
}) => {
  const daysUntil = differenceInCalendarDays(parseISO(event.start), new Date());

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
    const weeksUntil = differenceInCalendarWeeks(
      parseISO(event.start),
      new Date(),
      {
        weekStartsOn: 1,
      }
    );

    if (weeksUntil === 1) {
      daysText = 'На следующей неделе';
    } else if (weeksUntil === 2 || weeksUntil == 3 || weeksUntil === 4) {
      daysText = `Через ${weeksUntil} недели`;
    }
  }

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

  return (
    <BottomRowContainer>
      <HumanizedDateTime date={parseISO(event.start)} />
      {daysUntil >= 0 && (
        <Button kind="primary" size="big" onClick={registerCb}>
          К регистрации
        </Button>
      )}
      <div>{daysText}</div>
    </BottomRowContainer>
  );
};

const EventHeroBlock: React.FC<CommonProps & ExtraProps> = (props) => {
  const { event } = props;

  const imageUrl = event.image?.url || ''; // TODO - default image url?

  return (
    <HeroWithImage image={imageUrl}>
      <Container>
        <HeroTopLink href="/events">
          <HeroLabel>
            {event.realm === 'offline' ? 'Событие в Кочерге' : 'Онлайн-событие'}
          </HeroLabel>
        </HeroTopLink>
        <HeroHeader>{event.title}</HeroHeader>
        <BottomRow {...props} />
      </Container>
    </HeroWithImage>
  );
};

export default EventHeroBlock;
