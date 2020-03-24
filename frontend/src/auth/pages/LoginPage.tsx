import { withApollo } from '~/apollo/client';
import { NextApolloPage } from '~/apollo/types';

import { Page } from '~/components';
import { redirect } from '~/components/RedirectPage';
import { APIError } from '~/common/api';

import { CurrentUserQuery, CurrentUserDocument } from '../queries.generated';

import AuthForm from '../components/AuthForm';

interface Props {
  next: string;
}

const LoginPage: NextApolloPage<Props> = props => {
  return (
    <Page title="Логин">
      <Page.Title>Войти или зарегистрироваться</Page.Title>
      <AuthForm next={props.next} />
    </Page>
  );
};

LoginPage.getInitialProps = async ({ apolloClient, query, res }) => {
  const result = await apolloClient.query<CurrentUserQuery>({
    query: CurrentUserDocument,
  });

  if (!result.data) {
    throw new APIError('Expected query data', 500);
  }

  const user = result.data.my.user;

  if (user.is_authenticated) {
    return redirect('/', res) as any;
  }

  return {
    next: (query.next as string) || '/my',
  };
};

export default withApollo(LoginPage);
