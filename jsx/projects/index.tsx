import React from 'react';

import styled from 'styled-components';

import { Screen } from '../common/types';
import Page from '../components/Page';
import WorkInProgress from '../components/WorkInProgress';
import TL02 from '../blocks/TL02';

import ProjectCard from './components/ProjectCard';

import { Project, getAllProjects } from './utils';
import { InitialLoader } from '../common/types';

const Grid = styled.div`
  background-color: #eee;
  padding: 30px 60px;
  min-height: 500px;

  @media (max-width: 640px) {
    padding: 30px;
  }

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, auto));
  grid-auto-columns: auto;
  grid-gap: 40px;
  align-items: stretch;
  justify-items: stretch;
`;

interface Props {
  projects: Project[];
}

const ProjectsIndexPage = (props: Props) => {
  return (
    <Page title="Проекты Кочерги" wide>
      <WorkInProgress />
      <TL02 title="Активные проекты">
        Регулярные мероприятия и сообщества, которые собираются в Кочерге.<br />
        Рациональность, научно-популярные лектории, критическое мышление и
        многое другое.
      </TL02>
      <Grid>
        {props.projects.map(project => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </Grid>
    </Page>
  );
};

const getInitialData: InitialLoader<Props> = async ({ api }) => {
  return {
    projects: await getAllProjects(api),
  };
};

export default {
  component: ProjectsIndexPage,
  getInitialData,
} as Screen<Props>;
