import React from 'react';

import { NextApolloPage, withApollo } from '~/apollo';
import { PaddedBlock, Page } from '~/components';
import { RichEditor } from '~/components/RichEditor';

const SlatePage: NextApolloPage = () => {
  return (
    <Page title="Slate.JS experiments">
      <PaddedBlock>
        <RichEditor />
      </PaddedBlock>
    </Page>
  );
};

export default withApollo(SlatePage);
