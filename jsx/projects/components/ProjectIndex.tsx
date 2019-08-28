import React from 'react';

import styled from 'styled-components';

import TL02 from '~/blocks/TL02';

import { Project } from '../utils';

import ProjectCard from './ProjectCard';

interface Props {
  projects: Project[];
}

const Grid = styled.div`
  background-color: #eee;
  padding: 30px 60px;

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

const ProjectIndex: React.FC<Props> = ({ projects }) => {
  return (
    <React.Fragment>
      <TL02 title="Активные проекты">
        Регулярные мероприятия и сообщества, которые собираются в Кочерге.
        <br />
        Рациональность, научно-популярные лектории, критическое мышление и
        многое другое.
      </TL02>
      <Grid>
        {projects
          .filter(project => project.is_active)
          .map(project => (
            <ProjectCard key={project.id} {...project} />
          ))}
      </Grid>
      <TL02 title="Неактивные проекты" />
      <Grid>
        {projects
          .filter(project => !project.is_active)
          .map(project => (
            <ProjectCard key={project.id} {...project} />
          ))}
      </Grid>
    </React.Fragment>
  );
};

export default ProjectIndex;
