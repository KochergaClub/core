import { differenceInCalendarDays, parseISO } from 'date-fns';
import Link from 'next/link';
import React from 'react';

import { AlertCard } from '~/components';
import { publicEventRoute, publicEventsRootRoute } from '~/events/routes';
import { RichText } from '~/frontkit';
import { projectsListRoute } from '~/projects/routes';

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
        Посмотрите, что будет в Кочерге{' '}
        <Link href={publicEventsRootRoute()}>
          <a>в ближайшие дни.</a>
        </Link>
      </Wrapper>
    );
  }

  if (!project.is_active) {
    return (
      <Wrapper>
        Проект <ProjectLink project={project} /> больше не активен, но вы можете
        посмотреть на{' '}
        <Link href={projectsListRoute()}>
          <a>другие проекты Кочерги</a>
        </Link>{' '}
        или на{' '}
        <Link href={publicEventsRootRoute()}>
          <a>расписание ближайших событий</a>
        </Link>
        .
      </Wrapper>
    );
  }

  if (project.upcoming_events && project.upcoming_events.length) {
    const upcomingEvent = project.upcoming_events[0];
    return (
      <Wrapper>
        Ближайшее событие проекта <ProjectLink project={project} />:{' '}
        <Link href={publicEventRoute(upcomingEvent.id)}>
          <a>{upcomingEvent.title}</a>
        </Link>
        .
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
