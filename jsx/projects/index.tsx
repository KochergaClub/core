import React, { useState, useEffect } from 'react';

import styled from 'styled-components';

import Page from '../components/Page';
import ProjectCard from './components/ProjectCard';

import TL02 from '../blocks/TL02';

import { Project, getAllProjects } from './utils';

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

export default () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    getAllProjects().then(setProjects);
  }, []);

  return (
    <Page title="Проекты Кочерги" wide>
      <TL02 title="Активные проекты">
        Регулярные мероприятия и сообщества, которые собираются в Кочерге.<br />
        Рациональность, научно-популярные лектории, критическое мышление и
        многое другое.
      </TL02>
      <Grid>
        {projects.map(project => <ProjectCard key={project.id} {...project} />)}
      </Grid>
    </Page>
  );
};
