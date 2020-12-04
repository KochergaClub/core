import { parseISO } from 'date-fns';
import Link from 'next/link';
import styled, { css } from 'styled-components';

import HumanizedDateTime from '~/components/HumanizedDateTime';
import { publicEventRoute } from '~/events/routes';
import { Button, colors, Column } from '~/frontkit';

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
  justify-content: flex-end;

  ${padding}
  padding-top: 20px;
  padding-bottom: 20px;

  height: 200px;

  background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url(${(props) => props.image?.url || ''});

  @media (min-resolution: 192dpi) {
    background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
      url(${(props) => props.image_2x?.url || ''});
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
  const url = publicEventRoute(event.id);

  return (
    <Column stretch gutter={16}>
      <Link href={url} passHref>
        <BackgroundLink>
          <Background image={event.image} image_2x={event.image_2x}>
            <Header>{event.title}</Header>
          </Background>
        </BackgroundLink>
      </Link>
      <TimeWrapper>
        <HumanizedDateTime date={parseISO(event.start)} />
      </TimeWrapper>
      <Padded>{event.summary}</Padded>
      <Padded>
        <form action={url + '#register'}>
          <Button>Зарегистрироваться</Button>
        </form>
      </Padded>
    </Column>
  );
};

export default EventCard;
