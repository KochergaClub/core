import { parseISO } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import styled from 'styled-components';

import { formatDate, timezone } from '~/common/utils';
import { publicEventRoute } from '~/events/routes';
import { Label } from '~/frontkit';

import { EventSearchItemFragment } from '../queries.generated';
import ResultContainer from './ResultContainer';

const Small = styled.small`
  display: block;
  line-height: 1;
`;

const EventResult: React.FC<{ item: EventSearchItemFragment }> = ({ item }) => {
  const zonedStart = utcToZonedTime(parseISO(item.event.start), timezone);

  return (
    <ResultContainer url={publicEventRoute(item.event.id)}>
      <Label>Мероприятие</Label>
      <div>{item.event.title}</div>
      <Small>{formatDate(zonedStart, 'EEEE, d MMMM')}</Small>
    </ResultContainer>
  );
};

export default EventResult;
