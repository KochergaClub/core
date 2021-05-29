import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

import HeroHeader from '~/components/HeroHeader';
import TelegramIcon from '~/components/icons/TelegramIcon';
import { colors, Column, deviceMediaQueries, fonts, LabelA, LabelDiv, Row } from '~/frontkit';
import { projectsListRoute } from '~/projects/routes';

import { ProjectPageFragment } from './fragments.generated';

const Container = styled.div<{ image: string }>`
  min-height: 400px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)),
    url(${(props) => props.image});
  background-size: cover;
  background-position: center;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InnerContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  margin: 40px;
  max-width: 900px;
`;

const Summary = styled.div`
  color: white;
  ${deviceMediaQueries.tablet(`
    font-size: ${fonts.sizes.XL2};
  `)}
  ${deviceMediaQueries.laptop(`
    font-size: ${fonts.sizes.XL2};
  `)}
  ${deviceMediaQueries.desktop(`
    font-size: ${fonts.sizes.XL2};
  `)}
`;

const ActivitySummary = styled(LabelDiv)`
  color: white;
`;

interface Props {
  project: ProjectPageFragment;
}

export const ProjectHeroBlock: React.FC<Props> = ({ project }) => (
  <Container image={project.image.url}>
    <InnerContainer>
      <Link href={projectsListRoute()} passHref>
        <LabelA>&larr; Все проекты</LabelA>
      </Link>
      <HeroHeader>{project.title}</HeroHeader>
      <Summary>{project.summary}</Summary>
      <Column gutter={10}>
        <ActivitySummary>
          {project.is_active ? project.activity_summary : 'Неактивный проект'}
        </ActivitySummary>
        {project.telegram_chats.length ? (
          <LabelA href={project.telegram_chats[0].link}>
            <Row vCentered>
              <TelegramIcon size={16} color={colors.primary[300]} />
              <span>Чат проекта</span>
            </Row>
          </LabelA>
        ) : null}
      </Column>
    </InnerContainer>
  </Container>
);
