import { withApollo, NextApolloPage } from '~/apollo';
import { Page } from '~/components';
import AuthContainer from '~/auth/components/AuthContainer';
import CenteredLayout from '~/auth/components/CenteredLayout';

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
