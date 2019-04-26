import React, { useState, useEffect } from 'react';

import styled from 'styled-components';

import Page from '../components/Page';
import PageTitle from '../components/PageTitle';
import ProjectCard from './components/ProjectCard';

import { Project, getAllProjects } from './utils';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, auto));
  grid-auto-columns: auto;
  grid-gap: 20px;
  align-items: stretch;
  justify-items: stretch;
`;

export default () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    getAllProjects().then(setProjects);
  }, []);

  return (
    <Page title="Проекты Кочерги">
      <PageTitle>Проекты Кочерги</PageTitle>
      <Grid>
        {projects.map(project => <ProjectCard key={project.id} {...project} />)}
      </Grid>
    </Page>
  );
};
