import styled from 'styled-components';

import { colors } from '@kocherga/frontkit';

import { withApollo, NextApolloPage } from '~/apollo';

import { Page } from '~/components';
import { redirect } from '~/components/RedirectPage';
import { APIError } from '~/common/api';

import { CurrentUserQuery, CurrentUserDocument } from '../queries.generated';

import AuthForm from '../components/AuthForm';

interface Props {
  next: string;
}

// FIXME - copy-pasted from TariffsContainer in PublicEventPage
const LoginHint = styled.div`
  border: 1px solid ${colors.grey[300]};
  background-color: ${colors.grey[100]};
  max-width: 660px;
  margin: 0 auto;
  padding: 20px;
`;

const LoginPage: NextApolloPage<Props> = props => {
  return (
    <Page title="Войти в Кочергу">
      <Page.Title>Войти или зарегистрироваться</Page.Title>
      <AuthForm next={props.next} />
      <LoginHint>
        Через эту страницу можно войти в личный кабинет Кочерги.
        <br />
        Если вы тут впервые, просто введите свой email, и ссылка для входа
        придёт вам на почту. Пароль можно будет задать в настройках после
        логина.
      </LoginHint>
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
