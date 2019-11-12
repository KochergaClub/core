import { useCallback } from 'react';

import styled from 'styled-components';

import { differenceInCalendarDays, differenceInCalendarWeeks } from 'date-fns';

import { Button, Label, fonts } from '@kocherga/frontkit';
import { deviceMediaQueries } from '@kocherga/frontkit/dist/src/sizes';

import { trackEvent } from '~/components/analytics';

import HumanizedDateTime from '~/components/HumanizedDateTime';
import HeroWithImage from '~/components/HeroWithImage';
import HeroHeader from '~/components/HeroHeader';

import { PublicEvent } from '~/events/types';

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

interface Props {
  event: PublicEvent;
  registrationRef: React.MutableRefObject<HTMLElement | null>;
}

const BottomRow: React.FC<Props> = ({ event, registrationRef }) => {
  const daysUntil = differenceInCalendarDays(event.start, new Date());

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
    const weeksUntil = differenceInCalendarWeeks(event.start, new Date(), {
      weekStartsOn: 1,
    });

    if (weeksUntil === 1) {
      daysText = 'На следующей неделе';
    } else if (weeksUntil === 2 || weeksUntil == 3 || weeksUntil === 4) {
      daysText = `Через ${weeksUntil} недели`;
    }
  }

  const registerCb = useCallback(() => {
    trackEvent('event_top_register_button', {
      label: event.title,
    });

    if (!registrationRef.current) {
      return;
    }

    window.scrollTo({
      top: registrationRef.current.offsetTop,
      behavior: 'smooth',
    });
  }, [registrationRef]);

  return (
    <BottomRowContainer>
      <HumanizedDateTime date={event.start} />
      {daysUntil >= 0 && (
        <Button kind="primary" size="big" onClick={registerCb}>
          Зарегистрироваться
        </Button>
      )}
      <div>{daysText}</div>
    </BottomRowContainer>
  );
};

const ProjectHeroBlock: React.FC<Props> = props => {
  const { event } = props;

  const imageUrl = event.image || ''; // TODO - default image url?

  return (
    <HeroWithImage image={imageUrl}>
      <Container>
        <HeroTopLink href="/#schedule">
          <HeroLabel>Событие в Кочерге</HeroLabel>
        </HeroTopLink>
        <HeroHeader>{event.title}</HeroHeader>
        <BottomRow {...props} />
      </Container>
    </HeroWithImage>
  );
};

export default ProjectHeroBlock;
