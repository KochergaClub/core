import Link from 'next/link';
import React from 'react';

import { HeroHeader } from '~/components/HeroHeader';
import TelegramIcon from '~/components/icons/TelegramIcon';
import { colors, Column, LabelA, LabelDiv, Row } from '~/frontkit';
import { projectsListRoute } from '~/projects/routes';

import { ProjectPageFragment } from './fragments.generated';

interface Props {
  project: ProjectPageFragment;
}

export const ProjectHeroBlock: React.FC<Props> = ({ project }) => (
  <div
    className="min-h-80 flex flex-col items-center bg-cover bg-center"
    style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)),
    url(${project.image.url})`,
    }}
  >
    <div className="flex flex-col justify-between flex-1 m-10 max-w-4xl md:min-w-lg">
      <Link href={projectsListRoute()} passHref>
        <LabelA>&larr; Все проекты</LabelA>
      </Link>
      <HeroHeader>{project.title}</HeroHeader>
      <div className="text-white sm:text-2xl">{project.summary}</div>
      <Column gutter={10}>
        <LabelDiv color="white">
          {project.is_active ? project.activity_summary : 'Неактивный проект'}
        </LabelDiv>
        {project.telegram_chats.length ? (
          <LabelA href={project.telegram_chats[0].link}>
            <Row vCentered>
              <TelegramIcon size={16} color={colors.primary[300]} />
              <span>Чат проекта</span>
            </Row>
          </LabelA>
        ) : null}
      </Column>
    </div>
  </div>
);
