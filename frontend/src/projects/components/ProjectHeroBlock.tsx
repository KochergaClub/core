import styled from 'styled-components';
import { deviceMediaQueries } from '@kocherga/frontkit/esm/sizes';
import { Label, fonts } from '@kocherga/frontkit';

import { ProjectPageFragment } from '../queries.generated';

const Container = styled.div<{ image: string }>`
  min-height: 400px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url(${props => props.image});
  background-size: cover;
  background-position: center;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Header = styled.h1`
  margin: 0;
  padding-top: 48px;
  padding-bottom: 48px;

  line-height: 1.2;
  font-size: ${fonts.sizes.XXL};
  font-family: Intro;

  color: white;
  text-align: center;

  ${deviceMediaQueries.mobile(`
    font-size: ${fonts.sizes.L};
  `)}
  ${deviceMediaQueries.tablet(`
    font-size: ${fonts.sizes.XL};
  `)}
`;

const Summary = styled.div`
  margin: 0 20px;
  color: white;
  text-align: center;
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

const ActivitySummary = styled(Label)`
  color: white;
  text-align: center;
  margin-top: 64px;
  margin-bottom: 24px;
`;

interface Props {
  project: ProjectPageFragment;
}

const ProjectHeroBlock: React.FC<Props> = ({ project }) => (
  <Container image={project.image.url}>
    <div>
      <Header>{project.title}</Header>
      <Summary>{project.summary}</Summary>
    </div>
    <ActivitySummary>
      {project.is_active ? project.activity_summary : 'Неактивный проект'}
    </ActivitySummary>
  </Container>
);

export default ProjectHeroBlock;
