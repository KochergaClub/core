import React from 'react';

import { Customer } from '../types';

import SetPassword from './SetPassword';
import PrivacySettings from './PrivacySettings';

interface Props {
  customer?: Customer;
}

export default function SettingsSection(props: Props) {
  return (
    <div>
      <SetPassword />
      {props.customer && <PrivacySettings customer={props.customer} />}
    </div>
  );
}
