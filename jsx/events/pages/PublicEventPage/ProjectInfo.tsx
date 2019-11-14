import { differenceInCalendarDays } from 'date-fns';

import { RichText } from '@kocherga/frontkit';

import { ProjectPageType } from '~/projects/utils';

import AlertCard from '~/components/AlertCard';

import { PublicEvent } from '~/events/types';

interface Props {
  event: PublicEvent;
  project: ProjectPageType;
}

const Wrapper: React.FC = ({ children }) => (
  <AlertCard>
    <RichText>
      Это событие прошло.
      <br />
      {children}
    </RichText>
  </AlertCard>
);

const ProjectLink: React.FC<{ project: ProjectPageType }> = ({ project }) => (
  <a href={`/projects/${project.meta.slug}`}>{project.title}</a>
);

const ProjectInfo: React.FC<Props> = ({ event, project }) => {
  const daysUntil = differenceInCalendarDays(event.start, new Date());

  if (daysUntil >= 0) {
    return null; // TODO - show project info even for future events
  }

  if (!project) {
    return (
      <Wrapper>
        Это событие прошло.
        <br />
        Посмотрите, что будет в Кочерге <a href="/events">в ближайшие дни.</a>
      </Wrapper>
    );
  }

  if (!project.is_active) {
    return (
      <Wrapper>
        Проект <ProjectLink project={project} /> больше не активен, но вы можете
        посмотреть на <a href="/projects">другие проекты Кочерги</a> или на{' '}
        <a href="/events">расписание ближайших событий</a>.
      </Wrapper>
    );
  }

  if (project.upcoming_events && project.upcoming_events.length) {
    const upcomingEvent = project.upcoming_events[0];
    return (
      <Wrapper>
        Ближайшее событие проекта <ProjectLink project={project} />:{' '}
        <a href={`/events/${upcomingEvent.event_id}`}>{upcomingEvent.title}</a>.
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      Проект <ProjectLink project={project} /> продолжается, но следующее
      событие по нему пока ещё не объявлено.
    </Wrapper>
  );
};

export default ProjectInfo;
