import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

import HeroHeader from '~/components/HeroHeader';
import TelegramIcon from '~/components/icons/TelegramIcon';
import { A, colors, Column, deviceMediaQueries, fonts, LabelDiv, Row } from '~/frontkit';
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
    font-size: ${fonts.sizes.L};
  `)}
  ${deviceMediaQueries.laptop(`
    font-size: ${fonts.sizes.L};
  `)}
  ${deviceMediaQueries.desktop(`
    font-size: ${fonts.sizes.L};
  `)}
`;

const ActivitySummary = styled(LabelDiv)`
  color: white;
`;

const GreyA = styled(A)`
  ${fonts.label}
  color: ${colors.primary[300]};
`;

interface Props {
  project: ProjectPageFragment;
}

export const ProjectHeroBlock: React.FC<Props> = ({ project }) => (
  <Container image={project.image.url}>
    <InnerContainer>
      <Link href={projectsListRoute()} passHref>
        <GreyA>&larr; Все проекты</GreyA>
      </Link>
      <HeroHeader>{project.title}</HeroHeader>
      <Summary>{project.summary}</Summary>
      <Column gutter={10}>
        <ActivitySummary>
          {project.is_active ? project.activity_summary : 'Неактивный проект'}
        </ActivitySummary>
        {project.telegram_chats.length ? (
          <GreyA href={project.telegram_chats[0].link}>
            <Row vCentered>
              <TelegramIcon size={16} color={colors.primary[300]} />
              <span>Чат проекта</span>
            </Row>
          </GreyA>
        ) : null}
      </Column>
    </InnerContainer>
  </Container>
);
