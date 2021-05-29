import Link from 'next/link';
import styled from 'styled-components';

import { fonts, Label } from '~/frontkit';
import { projectRoute } from '~/projects/routes';

import { ProjectPage_SummaryFragment } from './fragments.generated';

const ProjectA = styled.a`
  text-decoration: none;
  color: black;
`;

const Card = styled.div`
  background-color: white;
  height: 100%;

  img {
    transition: opacity 0.3s;
  }
  &:hover img {
    opacity: 0.8;
  }
`;

const Inner = styled.div`
  padding: 20px;
  padding-top: 10px;
`;

const Header = styled.header`
  font-size: ${fonts.sizes.XL};
  line-height: 1.3;
  font-weight: 600;
`;

const Summary = styled.div`
  font-size: ${fonts.sizes.SM};
  line-height: 1.5;
  color: #333;
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ActivitySummary = styled(Label)`
  margin-top: 4px;
  margin-bottom: 10px;
  cursor: inherit; /* Label overrides cursor, but ActivitySummary is wrapped in Link so we'd prefer to inherit "pointer" */
`;

const ProjectCard = (props: ProjectPage_SummaryFragment) => {
  const url = projectRoute(props.meta.slug);

  return (
    <Link href={url} passHref>
      <ProjectA>
        <Card>
          <Image src={props.image.url} />
          <Inner>
            <Header>{props.title}</Header>
            {props.activity_summary && props.is_active && (
              <ActivitySummary>{props.activity_summary}</ActivitySummary>
            )}
            <Summary>{props.summary}</Summary>
          </Inner>
        </Card>
      </ProjectA>
    </Link>
  );
};

export default ProjectCard;
