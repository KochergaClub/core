import React from 'react';

import Page from '~/components/Page';
import RichTextBlock from '~/blocks/RichTextBlock';

import { NextWagtailPage } from '~/wagtail/types';

import ProjectHeroBlock from '../components/ProjectHeroBlock';
import { ProjectPageType } from '../utils';

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
    </Page>
  );
};

export default ProjectDetails;
