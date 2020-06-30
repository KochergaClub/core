import { withApollo } from '~/apollo';
import { Spinner } from '~/components';

const Error302 = () => <Spinner size="block" />;

export default withApollo(Error302);
