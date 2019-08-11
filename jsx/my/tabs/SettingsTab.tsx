import React from 'react';

import SetPassword from '../components/SetPassword';
import PrivacySettings from '../components/PrivacySettings';
import EmailSettings from '../components/EmailSettings';

const SettingsTab: React.FC<{}> = () => {
  return (
    <div>
      <SetPassword />
      <PrivacySettings />
      <EmailSettings />
    </div>
  );
};

export default SettingsTab;
