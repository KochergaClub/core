import { useCallback } from 'react';

import styled from 'styled-components';

import { differenceInDays, differenceInCalendarWeeks } from 'date-fns';

import { Button, Label, fonts } from '@kocherga/frontkit';
import { deviceMediaQueries } from '@kocherga/frontkit/dist/src/sizes';

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
      align-items: end;
    font-size: ${fonts.sizes.L};
    `)}

  > :first-child,
  > :last-child {
    flex: 1;
    text-align: center;
  }

  > :nth-child(2) {
    margin: 0 32px;
  }
`;

interface Props {
  event: PublicEvent;
  registrationRef: React.MutableRefObject<HTMLElement | null>;
}

const BottomRow: React.FC<Props> = ({ event, registrationRef }) => {
  const inDays = differenceInDays(event.start, new Date());

  let daysText = '';

  if (inDays === 0) {
    daysText = 'Сегодня';
  } else if (inDays < 0) {
    daysText = 'Это событие прошло';
  } else if (inDays === 1) {
    daysText = 'Завтра';
  } else if (inDays === 2) {
    daysText = 'Послезавтра';
  } else if (inDays === 3) {
    daysText = 'Через 3 дня';
  } else if (inDays === 4) {
    daysText = 'Через 4 дня';
  } else if (inDays === 5) {
    daysText = 'Через 5 дней';
  } else if (inDays === 6) {
    daysText = 'Через 6 дней';
  } else {
    // more than 6 days
    const inWeeks = differenceInCalendarWeeks(event.start, new Date(), {
      weekStartsOn: 1,
    });

    if (inWeeks === 1) {
      daysText = 'На следующей неделе';
    } else if (inWeeks === 2 || inWeeks == 3 || inWeeks === 4) {
      daysText = `Через ${inWeeks} недели`;
    }
  }

  const registerCb = useCallback(() => {
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
      <Button onClick={registerCb}>Зарегистрироваться</Button>
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
