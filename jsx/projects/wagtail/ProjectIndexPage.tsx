import React from 'react';

import styled from 'styled-components';

import { deviceMediaQueries } from '@kocherga/frontkit/dist/src/sizes';

import TL02 from '~/blocks/TL02';
import Page from '~/components/Page';
import { selectAPI } from '~/core/selectors';

import { NextWagtailPage } from '~/wagtail/types';
import { WagtailPageProps } from '~/wagtail/types';

import ProjectCard from '../components/ProjectCard';

import { ProjectPageType } from '../utils';

export interface ExtraProps {
  projects: ProjectPageType[];
}

export interface PageType extends WagtailPageProps {
  meta_type: 'projects.ProjectIndexPage';
}

const Grid = styled.div`
  background-color: #eee;
  padding: 30px 60px;

  ${deviceMediaQueries.mobile(`
    padding: 30px 0;
  `)}

  ${deviceMediaQueries.tablet(`
    padding: 30px;
  `)}

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-auto-columns: minmax(300px, auto);
  grid-gap: 40px;
  align-items: stretch;
  justify-items: stretch;
`;

const ProjectIndexPage: NextWagtailPage<PageType, ExtraProps> = ({
  wagtailPage,
  projects,
}) => {
  return (
    <Page
      title={wagtailPage.title}
      description="Регулярные мероприятия и сообщества, которые собираются в Кочерге.
      Рациональность, научно-популярные лектории, критическое мышление и многое другое."
    >
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
    </Page>
  );
};

ProjectIndexPage.getInitialProps = async ({ store: { getState } }) => {
  const api = selectAPI(getState());

  const json = await api.callWagtail(
    'pages/?type=projects.ProjectPage&fields=summary,activity_summary,image,image_thumbnail,is_active&limit=100'
  );
  return { projects: json.items };
};

export default ProjectIndexPage;
