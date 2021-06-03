import { useState } from 'react';

import { TL02 } from '~/blocks/TL02';
import { Page } from '~/components';
import { RichText } from '~/frontkit';
import { NextWagtailPage } from '~/wagtail/types';

import {
    ProjectIndexPageFragment, ProjectIndexPageFragmentDoc, ProjectPage_SummaryFragment
} from './fragments.generated';
import ProjectCard from './ProjectCard';

interface ProjectsGridProps {
  projects: ProjectPage_SummaryFragment[];
}

const ProjectsGrid: React.FC<ProjectsGridProps> = ({ projects }) => (
  <div className="bg-gray-100 py-8 sm:px-8 md:px-16">
    <div className="max-w-7xl mx-auto grid gap-10 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </div>
  </div>
);

const InactiveProjects: React.FC<ProjectsGridProps> = ({ projects }) => {
  const [revealed, setRevealed] = useState(false);

  return revealed ? (
    <>
      <TL02 title="Неактивные проекты" />
      <ProjectsGrid projects={projects} />
    </>
  ) : (
    <div className="my-10 text-center">
      <a
        className="text-primary-link no-underline border-b border-dashed border-primary-link hover:border-solid"
        href="#"
        onClick={(e) => {
          e.preventDefault();
          setRevealed(true);
        }}
      >
        Показать неактивные проекты
      </a>
    </div>
  );
};

const ProjectIndexPage: NextWagtailPage<ProjectIndexPageFragment> = ({
  page,
}) => {
  return (
    <Page title={page.title} description={page.meta.description}>
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
