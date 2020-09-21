import { NextApolloPage, withApollo } from '~/apollo';
import { APIError } from '~/common/api';
import { HintCard, Page } from '~/components';
import { redirect } from '~/components/RedirectPage';

import AuthForm from '../components/AuthForm';
import CenteredLayout from '../components/CenteredLayout';
import { CurrentUserDocument } from '../queries.generated';
import { checkYourEmailRoute } from '../routes';

interface Props {
  next: string;
}

const LoginPage: NextApolloPage<Props> = (props) => {
  return (
    <Page title="Войти в Кочергу">
      <Page.Title>Войти или зарегистрироваться</Page.Title>
      <CenteredLayout>
        <AuthForm
          onLogin={() => (window.location.href = props.next)}
          onMagicLinkSent={() =>
            (window.location.href = checkYourEmailRoute().as)
          }
          next={props.next}
        />
        <HintCard>
          Через эту страницу можно войти в личный кабинет Кочерги.
          <br />
          Если вы тут впервые, просто введите свой email, и ссылка для входа
          придёт вам на почту. Пароль можно будет задать в настройках после
          логина.
        </HintCard>
      </CenteredLayout>
    </Page>
  );
};

LoginPage.getInitialProps = async ({ apolloClient, query, res }) => {
  const result = await apolloClient.query({
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
