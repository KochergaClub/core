import React, { useCallback, useState } from 'react';

import styled from 'styled-components';
import { FaGlobe, FaLock } from 'react-icons/fa';

import { Button, Column } from '@kocherga/frontkit';

import { useAPI } from '~/common/hooks';

import { Customer } from '../types';

import TVIcon from './TVIcon';

const TvContainer = styled.div`
  position: relative;
`;

const IconContainer = styled.div`
  position: absolute;

  font-size: 32px;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const PrivacyTv = ({ mode }: { mode: string }) => {
  return (
    <TvContainer>
      <TVIcon />
      <IconContainer>
        {mode === 'private' ? <FaLock /> : <FaGlobe />}
      </IconContainer>
    </TvContainer>
  );
};

const oppositePrivacyMode = (mode: string) =>
  mode == 'private' ? 'public' : 'private';

interface Props {
  customer: Customer;
}

export default function PrivacySettings({ customer }: Props) {
  const [loading, setLoading] = useState(false);
  const api = useAPI();

  const flipPrivacyMode = useCallback(
    async () => {
      setLoading(true);
      await api.call('cm/me/set-privacy-mode', 'POST', {
        privacy_mode: oppositePrivacyMode(customer.privacy_mode),
      });
      window.location.reload(); // TODO
    },
    [customer.privacy_mode]
  );

  return (
    <Column centered>
      <h3>Настройки приватности</h3>
      <PrivacyTv mode={customer.privacy_mode} />
      <div>
        Ваше присутствие{' '}
        <strong>
          {customer.privacy_mode == 'public'
            ? 'отображается'
            : 'не отображается'}
        </strong>{' '}
        на <a href="https://now.kocherga.club">now.kocherga.club</a> и
        телевизорах в Кочерге.
      </div>
      <Button onClick={flipPrivacyMode} loading={loading} disabled={loading}>
        {customer.privacy_mode == 'public' ? 'Отключить' : 'Включить'}
      </Button>
    </Column>
  );
}
