import { NextPage } from '~/common/types';

import App from '../App';

interface Props {
  route: string;
}

const IndexPage: NextPage<Props> = ({ route }) => <App route={route} />;

IndexPage.getInitialProps = async () => {
  return {
    route: '/team/evenman', // FIXME
  };
};

export default IndexPage;
