import React from 'react';

import RichTextBlock from '~/blocks/RichTextBlock';
import { Page } from '~/components';
import { NextWagtailPage } from '~/wagtail/types';

import { ProjectPageFragment, ProjectPageFragmentDoc } from './fragments.generated';
import { ProjectHeroBlock } from './ProjectHeroBlock';
import UpcomingEventsBlock from './UpcomingEventsBlock';

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
      {/* {project.telegram_chats.length ? (
        <div>
          <TL03
            title={`Чат${project.telegram_chats.length > 1 ? 'ы' : ''} проекта`}
            grey
          />
          <TelegramChatsBlock
            chats={project.telegram_chats}
            hideProjectLink={true}
          />
        </div>
      ) : null} */}
      <UpcomingEventsBlock project={project} />
    </Page>
  );
};

ProjectPage.fragment = ProjectPageFragmentDoc;

export default ProjectPage;
