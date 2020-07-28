import styled, { css } from 'styled-components';
import { parseISO } from 'date-fns';

import { colors, Column, Button } from '@kocherga/frontkit';

import HumanizedDateTime from '~/components/HumanizedDateTime';

import { Event_SummaryFragment } from '../../queries.generated';

const padding = css`
  padding-left: 20px;
  padding-right: 20px;
`;

const Background = styled.div<{
  image?: Event_SummaryFragment['image'];
  image_2x?: Event_SummaryFragment['image_2x'];
}>`
  display: flex;
  flex-direction: column;
  justify-content: end;

  ${padding}
  padding-top: 20px;
  padding-bottom: 20px;

  height: 200px;

  background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url(${props => props.image?.url || ''});

  @media (min-resolution: 192dpi) {
    background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
      url(${props => props.image_2x?.url || ''});
  }

  &:hover {
    header {
      color: ${colors.grey[300]};
    }
  }
  background-size: cover;
  background-position: center;
`;

const BackgroundLink = styled.a`
  text-decoration: none;
`;

const Header = styled.header`
  color: white;
  font-weight: bold;
  font-size: 24px;
  transition: color 0.2s;
`;

const TimeWrapper = styled.div`
  ${padding}
  font-weight: bold;
  font-style: italic;
`;

const Padded = styled.div`
  ${padding}
`;

interface Props {
  event: Event_SummaryFragment;
  mode?: 'timepad';
}

const EventCard: React.FC<Props> = ({ event }) => {
  const href = `/events/${event.id}`;

  // target="_top" attributes can be removed after we roll out the new frontpage and disable the schedule iframe (necessary for Tilda).
  return (
    <Column stretch gutter={16}>
      <BackgroundLink href={href} target="_top">
        <Background image={event.image} image_2x={event.image_2x}>
          <Header>{event.title}</Header>
        </Background>
      </BackgroundLink>
      <TimeWrapper>
        <HumanizedDateTime date={parseISO(event.start)} />
      </TimeWrapper>
      <Padded>{event.summary}</Padded>
      <Padded>
        <form action={href + '#register'} target="_top">
          <Button>Зарегистрироваться</Button>
        </form>
      </Padded>
    </Column>
  );
};

export default EventCard;
