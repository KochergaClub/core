import SetPassword from '../components/SetPassword';
import PrivacySettings from '../components/PrivacySettings';
import EmailSettings from '../components/EmailSettings';

import { MyPageFragment } from '../queries.generated';

interface Props {
  my: MyPageFragment;
}

const SettingsTab: React.FC<Props> = ({ my }) => {
  return (
    <div>
      <SetPassword />
      {my.membership ? <PrivacySettings membership={my.membership} /> : null}
      <EmailSettings email_subscription={my.email_subscription} />
    </div>
  );
};

export default SettingsTab;
