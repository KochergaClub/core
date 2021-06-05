import { parseISO } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

import { formatDate, timezone } from '~/common/utils';
import { publicEventRoute } from '~/events/routes';
import { Label } from '~/frontkit';

import { EventSearchItemFragment } from '../queries.generated';
import ResultContainer from './ResultContainer';

const EventResult: React.FC<{ item: EventSearchItemFragment }> = ({ item }) => {
  const zonedStart = utcToZonedTime(parseISO(item.event.start), timezone);

  return (
    <ResultContainer url={publicEventRoute(item.event.id)}>
      <Label>Мероприятие</Label>
      <div>{item.event.title}</div>
      <div className="text-xs">{formatDate(zonedStart, 'EEEE, d MMMM')}</div>
    </ResultContainer>
  );
};

export default EventResult;
