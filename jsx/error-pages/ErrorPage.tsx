import * as React from 'react';

import Page from '../components/Page';

import { Column } from '@kocherga/frontkit';

interface Props {
  code: number;
  title: string;
  image: string;
}

const ErrorPage = ({ code, title, image }: Props) => (
  <Page title={title} noMenu>
    <Page.Main>
      <Column centered style={{ marginTop: 20, marginBottom: 50 }} gutter={40}>
        <h1 style={{ fontSize: 40 }}>{code}</h1>
        <a href="/">
          <img src={image} style={{ width: 'auto', height: 300 }} />
        </a>
        <h1>{title}</h1>
      </Column>
    </Page.Main>
  </Page>
);
export default ErrorPage;
