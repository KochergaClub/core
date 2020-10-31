import { NextApolloPage, withApollo, withStaff } from '~/apollo';
import { Page } from '~/components';
import { A } from '~/frontkit';
import PbxCallDetails from '~/zadarma/components/PbxCallDetails';

type Props = {
  pbx_call_id: string;
};

const ZadarmaCallPage: NextApolloPage<Props> = ({ pbx_call_id }) => {
  const title = `Архивный звонок ${pbx_call_id}`;
  return (
    <Page title={title} menu="team">
      <Page.Title>{title}</Page.Title>
      <Page.Main>
        <A href="/team/zadarma">&larr; Ко всем звонкам</A>
        <br />
        <br />
        <PbxCallDetails id={pbx_call_id} />
      </Page.Main>
    </Page>
  );
};

ZadarmaCallPage.getInitialProps = async ({ query }) => {
  return {
    pbx_call_id: query.id as string,
  };
};

export default withApollo(withStaff(ZadarmaCallPage));
