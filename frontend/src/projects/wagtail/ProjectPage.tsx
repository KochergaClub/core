import { Page } from '~/components';
import RichTextBlock from '~/blocks/RichTextBlock';

import { NextWagtailPage } from '~/wagtail/types';

import {
  ProjectPageFragment,
  ProjectPageFragmentDoc,
} from '../queries.generated';

import ProjectHeroBlock from '../components/ProjectHeroBlock';
import UpcomingEventsBlock from '../components/UpcomingEventsBlock';

const ProjectPage: NextWagtailPage<ProjectPageFragment> = ({
  page: project,
}) => {
  return (
    <Page
      title={project.title}
      og={{ image: project.image.url }}
      description={project.summary}
    >
      <ProjectHeroBlock project={project} />
      <RichTextBlock html={project.body} />
      <UpcomingEventsBlock project={project} />
    </Page>
  );
};

ProjectPage.fragment = ProjectPageFragmentDoc;

export default ProjectPage;
