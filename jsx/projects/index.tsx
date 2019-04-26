import React from 'react';

import styled from 'styled-components';

import Page from '../components/Page';
import PageTitle from '../components/PageTitle';
import ProjectCard from './components/ProjectCard';

import { PROJECTS } from './constants';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, auto));
  grid-auto-columns: auto;
  grid-gap: 20px;
  align-items: stretch;
`;

export default () => (
  <Page title="Проекты Кочерги">
    <PageTitle>Проекты Кочерги</PageTitle>
    <Grid>
      {PROJECTS.items.map(project => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </Grid>
  </Page>
);
