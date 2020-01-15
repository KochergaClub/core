import { NextPage } from '~/common/types';
import { Page } from '~/components';
import AuthContainer from '~/auth/components/AuthContainer';

const CheckYourEmailPage: NextPage = () => (
  <Page title="Логин">
    <AuthContainer>
      Мы отправили вам письмо. Нажмите на ссылку в нём, чтобы войти.
    </AuthContainer>
  </Page>
);

export default CheckYourEmailPage;
