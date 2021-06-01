import { NextApolloPage, withApollo } from '~/apollo';
import { AuthContainer } from '~/auth/components/AuthContainer';
import { CenteredLayout } from '~/auth/components/CenteredLayout';
import { Page } from '~/components';

const CheckYourEmailPage: NextApolloPage = () => (
  <Page title="Логин">
    <CenteredLayout>
      <AuthContainer>
        Мы отправили вам письмо. Нажмите на ссылку в нём, чтобы войти.
      </AuthContainer>
    </CenteredLayout>
  </Page>
);

export default withApollo(CheckYourEmailPage);
