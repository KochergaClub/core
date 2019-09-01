import React from 'react';

import Head from 'next/head';

import { GlobalStyle } from '@kocherga/frontkit';

import TildaMenu from './TildaMenu';
import TildaFooter from './TildaFooter';
import ErrorBoundary from './ErrorBoundary';

import PageTitle from './PageTitle';
import Main from './Main';

import NProgressStyle from './NProgressStyle';

const DEFAULT_IMAGE = '/static/menu-logo'; // TODO - replace with a better image

interface OpenGraph {
  title?: string;
  image?: string;
}

interface Props {
  title: string;
  description?: string;
  team?: boolean;
  children: React.ReactNode;
  noMenu?: boolean;
  noFooter?: boolean;
  og?: OpenGraph;
}

const MetaTags: React.FC<{
  og: OpenGraph;
  title: string;
  description?: string;
}> = ({ og, title, description }) => (
  <React.Fragment>
    <title>{title}</title>
    <meta property="og:title" content={og ? og.title || title : title} />
    <meta
      property="og:image"
      content={og ? og.image || DEFAULT_IMAGE : DEFAULT_IMAGE}
    />
    {description ? (
      <React.Fragment>
        <meta property="og:description" content={description} />
        <meta name="description" content={description} />
      </React.Fragment>
    ) : null}
  </React.Fragment>
);

const Page = ({
  title,
  description,
  team,
  children,
  noMenu,
  noFooter,
  og,
}: Props) => {
  return (
    <div>
      <GlobalStyle />
      <NProgressStyle />
      <Head>
        <MetaTags title={title} description={description} og={og || {}} />
        <link rel="stylesheet" href="/static/normalize.css" />
        <link rel="shortcut icon" href="/static/favicon.ico" />
        {/* NOTE - <GlobalFonts /> doesn't work for some reason */}
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:400,400i,500,500i,700,700i&display=block&subset=cyrillic"
          rel="stylesheet"
        />
      </Head>
      {noMenu || <TildaMenu team={team || false} />}
      <ErrorBoundary>{children}</ErrorBoundary>
      {noFooter || <TildaFooter />}
    </div>
  );
};

Page.Title = PageTitle;
Page.Main = Main;

export default Page;
