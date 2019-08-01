import React from 'react';

import { Customer } from '../types';

import SetPassword from '../components/SetPassword';
import PrivacySettings from '../components/PrivacySettings';

interface Props {
  customer?: Customer;
}

export default function SettingsTab(props: Props) {
  return (
    <div>
      <SetPassword />
      {props.customer && <PrivacySettings customer={props.customer} />}
    </div>
  );
}
