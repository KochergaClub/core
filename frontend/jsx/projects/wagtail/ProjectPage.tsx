import React from 'react';

import Page from '~/components/Page';
import RichTextBlock from '~/blocks/RichTextBlock';

import { NextWagtailPage } from '~/wagtail/types';

import { ProjectPageType } from '../utils';

import ProjectHeroBlock from '../components/ProjectHeroBlock';
import UpcomingEventsBlock from '../components/UpcomingEventsBlock';

const ProjectDetails: NextWagtailPage<ProjectPageType> = ({
  wagtailPage: project,
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

export default ProjectDetails;
