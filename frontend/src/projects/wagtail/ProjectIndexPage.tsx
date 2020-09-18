import { useState } from 'react';
import styled from 'styled-components';

import { Button, deviceMediaQueries, Row } from '@kocherga/frontkit';

import TL02 from '~/blocks/TL02';
import { Page } from '~/components';
import { NextWagtailPage } from '~/wagtail/types';

import ProjectCard from '../components/ProjectCard';
import {
    ProjectIndexPageFragment, ProjectIndexPageFragmentDoc, ProjectPage_SummaryFragment
} from '../queries.generated';

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

const InactiveContainer = styled.div`
  margin-bottom: 80px;
`;

interface ProjectsGridProps {
  projects: ProjectPage_SummaryFragment[];
}

const ProjectsGrid: React.FC<ProjectsGridProps> = ({ projects }) => (
  <Grid>
    {projects.map((project) => (
      <ProjectCard key={project.id} {...project} />
    ))}
  </Grid>
);

const InactiveProjects: React.FC<ProjectsGridProps> = ({ projects }) => {
  const [revealed, setRevealed] = useState(false);

  return (
    <InactiveContainer>
      {revealed ? (
        <ProjectsGrid projects={projects} />
      ) : (
        <Row centered>
          <Button size="big" onClick={() => setRevealed(true)}>
            Показать
          </Button>
        </Row>
      )}
    </InactiveContainer>
  );
};

const ProjectIndexPage: NextWagtailPage<ProjectIndexPageFragment> = ({
  page,
}) => {
  return (
    <Page title={page.title} description={page.meta.description}>
      {/* TODO - move text to wagtail */}
      <TL02 title="Активные проекты">
        Регулярные мероприятия и сообщества, которые собираются в Кочерге.
        <br />
        Рациональность, научно-популярные лектории, критическое мышление и
        многое другое.
      </TL02>
      <ProjectsGrid projects={page.active_projects} />
      <TL02 title="Неактивные проекты" />
      <InactiveProjects projects={page.inactive_projects} />
    </Page>
  );
};

ProjectIndexPage.fragment = ProjectIndexPageFragmentDoc;

export default ProjectIndexPage;
