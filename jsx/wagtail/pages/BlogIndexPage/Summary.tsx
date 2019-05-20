import React from 'react';
import styled from 'styled-components';

import { A, colors } from '@kocherga/frontkit';

import { BlogPostSummary } from './types';

const Container = styled.section`
  border-bottom: 1px solid ${colors.grey[200]};
  margin-bottom: 40px;
`;

const Header = styled.header`
  margin-bottom: 4px;
`;

const Link = styled(A)`
  font-size: 24px;
`;

const Text = styled.div`
  margin-bottom: 32px;
`;

export default function Summary(summary: BlogPostSummary) {
  return (
    <Container>
      <Header>
        <Link href={`/blog/${summary.meta.slug}`}>{summary.title}</Link>
      </Header>
      <Text>{summary.summary}</Text>
    </Container>
  );
}
