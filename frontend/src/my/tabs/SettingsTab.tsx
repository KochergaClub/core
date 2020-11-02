import { HR } from '~/frontkit';
import SetNames from '../components/SetNames';
import SetPassword from '../components/SetPassword';
import PrivacySettings from '../components/PrivacySettings';
import EmailSettings from '../components/EmailSettings';

import { MySettingsPageFragment } from '../queries.generated';

interface Props {
  my: MySettingsPageFragment;
}

const SettingsTab: React.FC<Props> = ({ my }) => {
  return (
    <div>
      <SetNames user={my.user} />
      <HR />
      <SetPassword />
      {my.membership ? (
        <>
          <HR />
          <PrivacySettings membership={my.membership} />
        </>
      ) : null}
      <HR />
      <EmailSettings email_subscription={my.email_subscription} />
    </div>
  );
};

export default SettingsTab;
