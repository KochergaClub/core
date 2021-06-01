import { parseISO } from 'date-fns';
import Link from 'next/link';

import HumanizedDateTime from '~/components/HumanizedDateTime';
import { publicEventRoute } from '~/events/routes';
import { Button, Column } from '~/frontkit';

import { Event_SummaryFragment } from '../../queries.generated';

interface Props {
  event: Event_SummaryFragment;
  mode?: 'timepad';
}

const EventCard: React.FC<Props> = ({ event }) => {
  const url = publicEventRoute(event.id);

  return (
    <Column stretch gutter={16}>
      <Link href={url} passHref>
        <a className="no-underline">
          <div className="relative h-40 text-white hover:text-gray-300 flex flex-col justify-end">
            <img
              className="absolute inset-0 w-full h-full object-cover object-center filter brightness-50 -z-10"
              srcSet={`${event.image?.url}, ${event.image_2x?.url} 2x`}
            />
            <header className="p-5 font-bold text-2xl transition-colors">
              {event.title}
            </header>
          </div>
        </a>
      </Link>
      <div className="px-5 font-bold italic">
        <HumanizedDateTime date={parseISO(event.start)} />
      </div>
      <div className="px-5">{event.summary}</div>
      <div className="px-5">
        <form action={url + '#register'}>
          <Button>Зарегистрироваться</Button>
        </form>
      </div>
    </Column>
  );
};

export default EventCard;
