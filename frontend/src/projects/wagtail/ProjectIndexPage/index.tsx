import { useState } from 'react';
import styled from 'styled-components';

import { TL02 } from '~/blocks/TL02';
import { Page } from '~/components';
import { A, deviceMediaQueries, RichText } from '~/frontkit';
import { NextWagtailPage } from '~/wagtail/types';

import {
    ProjectIndexPageFragment, ProjectIndexPageFragmentDoc, ProjectPage_SummaryFragment
} from './fragments.generated';
import ProjectCard from './ProjectCard';

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

const ShowInactiveContainer = styled.div`
  margin: 40px 0;
  text-align: center;
`;

const ShowInactive = styled(A)`
  text-decoration: underline;
  text-decoration-style: dashed;
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

  return revealed ? (
    <>
      <TL02 title="Неактивные проекты" />
      <ProjectsGrid projects={projects} />
    </>
  ) : (
    <ShowInactiveContainer>
      <ShowInactive
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setRevealed(true);
        }}
      >
        Показать неактивные проекты
      </ShowInactive>
    </ShowInactiveContainer>
  );
};

const ProjectIndexPage: NextWagtailPage<ProjectIndexPageFragment> = ({
  page,
}) => {
  return (
    <Page title={page.title} description={page.meta.description}>
      {/* TODO - move text to wagtail */}
      <TL02 title="Проекты Кочерги">
        <RichText
          dangerouslySetInnerHTML={{ __html: page.active_description }}
        />
      </TL02>
      <ProjectsGrid projects={page.active_projects} />
      <InactiveProjects projects={page.inactive_projects} />
    </Page>
  );
};

ProjectIndexPage.fragment = ProjectIndexPageFragmentDoc;

export default ProjectIndexPage;
