import { A } from '@kocherga/frontkit';

import { withApollo } from '~/apollo/client';

import { NextPage } from '~/common/types';
import { Page } from '~/components';

import PbxCallDetails from '~/zadarma/components/PbxCallDetails';

interface Props {
  pbx_call_id: string;
}

const ZadarmaCallPage: NextPage<Props> = ({ pbx_call_id }) => {
  const title = `Архивный звонок ${pbx_call_id}`;
  return (
    <Page title={title} team>
      <Page.Title>{title}</Page.Title>
      <Page.Main>
        <A href="/team/zadarma">&larr; Ко всем звонкам</A>
        <br />
        <br />
        <PbxCallDetails pbx_call_id={pbx_call_id} />
      </Page.Main>
    </Page>
  );
};

ZadarmaCallPage.getInitialProps = async ({ query }) => ({
  pbx_call_id: query.id as string,
});

export default withApollo(ZadarmaCallPage);
