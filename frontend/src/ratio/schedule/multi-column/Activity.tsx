import styled from 'styled-components';

import { Row } from '@kocherga/frontkit';

import { ActivityFragment } from '../../queries.generated';

interface Props {
  activity: ActivityFragment;
}

const timeWithoutSections = (time: string) => {
  const match = time.match(/^\d+:\d+/);
  if (!match) {
    throw new Error('Unparsable time');
  }
  return match[0];
};

const Container = styled.div<{ outline: boolean }>`
  @font-face {
    font-family: 'Intro Book';
    src: url('/static/fonts/intro-pack/Intro-book.otf');
  }
  font-family: 'Intro Book';

  width: 100%;
  ${props => props.outline && 'background-color: #eee;'};

  line-height: 1.2;
`;

const Time = styled.time`
  font-size: 0.9em;
`;

const Name = styled.div`
  font-weight: bold;
  font-size: 0.9em;
`;

const Trainer = styled.div`
  font-size: 0.75em;
`;

const Location = styled.div`
  font-style: italic;
  font-size: 0.9em;
`;

export default function Activity({ activity }: Props) {
  const time = timeWithoutSections(activity.time);
  const outline = activity.activity_type === 'break';
  return (
    <Container outline={outline}>
      <Row>
        <Time>{time}</Time>
        {activity.location ? <Location>{activity.location}</Location> : null}
      </Row>
      <Name>{activity.name}</Name>
      {activity.trainer && <Trainer>{activity.trainer.long_name}</Trainer>}
    </Container>
  );
}
