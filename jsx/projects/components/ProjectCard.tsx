import React from 'react';

import styled from 'styled-components';

import { ProjectPageType } from '../utils';
import { Label } from '@kocherga/frontkit';

const ProjectA = styled.a`
  text-decoration: none;
  color: black;
`;

const Card = styled.div`
  background-color: white;
  padding-bottom: 10px;
  min-width: 300px;
  max-width: 500px;
  height: 100%;

  img {
    transition: opacity 0.3s;
  }
  &:hover img {
    opacity: 0.8;
  }
`;

const Inner = styled.div`
  padding: 10px 20px;
`;

const Header = styled.header`
  font-size: 1.3rem;
  line-height: 1.3;
  font-weight: 600;
`;

const Summary = styled.div`
  font-size: 0.9rem;
  line-height: 1.5;
  color: #333;
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ActivitySummary = styled(Label)`
  margin-top: 10px;
`;

const ProjectCard = (props: ProjectPageType) => {
  // TODO - use <Link> for client-side navigation, but wagtail API is not available on the client-side yet
  return (
    <ProjectA href={`/projects/${props.meta.slug}`}>
      <Card>
        <Image src={props.image_thumbnail.url} />
        <Inner>
          <Header>{props.title}</Header>
          <Summary>{props.summary}</Summary>
          <ActivitySummary>{props.activity_summary}</ActivitySummary>
        </Inner>
      </Card>
    </ProjectA>
  );
};

export default ProjectCard;
