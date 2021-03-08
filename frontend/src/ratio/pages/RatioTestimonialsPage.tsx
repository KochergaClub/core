import React from 'react';

import { NextApolloPage, withApollo } from '~/apollo';
import { Page } from '~/components';

import { TestimonialsBlock } from '../components/testimonials/TestimonialsBlock';

const RatioTestimonialsPage: NextApolloPage = () => {
  return (
    <Page title="Отзывы на тренинги Кочерги">
      <Page.Title>Отзывы на тренинги Кочерги</Page.Title>
      <TestimonialsBlock />
    </Page>
  );
};

export default withApollo(RatioTestimonialsPage);
