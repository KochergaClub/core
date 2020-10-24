import { differenceInCalendarDays, parseISO } from 'date-fns';

import { RichText } from '~/frontkit';

import AlertCard from '~/components/AlertCard';

import { ProjectPage_SummaryForEventFragment } from './queries.generated';

import { CommonProps } from './types';

const Wrapper: React.FC = ({ children }) => (
  <AlertCard>
    <RichText>
      Это событие прошло.
      <br />
      {children}
    </RichText>
  </AlertCard>
);

const ProjectLink: React.FC<{
  project: ProjectPage_SummaryForEventFragment;
}> = ({ project }) => (
  <a href={`/projects/${project.meta.slug}`}>{project.title}</a>
);

const ProjectInfo: React.FC<CommonProps> = ({ event }) => {
  const daysUntil = differenceInCalendarDays(parseISO(event.start), new Date());

  if (daysUntil >= 0) {
    return null; // TODO - show project info even for future events
  }

  const { project } = event;

  if (!project) {
    return (
      <Wrapper>
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
        <a href={`/events/${upcomingEvent.id}`}>{upcomingEvent.title}</a>.
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
