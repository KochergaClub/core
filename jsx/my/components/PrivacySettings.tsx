import React, { useCallback, useState } from 'react';
import { connect, useDispatch } from 'react-redux';

import styled from 'styled-components';
import { FaGlobe, FaLock } from 'react-icons/fa';

import { A, Button, Column } from '@kocherga/frontkit';

import { useAPI } from '~/common/hooks';
import { State } from '~/redux/store';

import { Customer } from '../types';
import { setPrivacyMode } from '../actions';
import { selectCustomer } from '../selectors';

import TVIcon from './TVIcon';

import HeadedFragment from './HeadedFragment';

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

const PrivacySettings: React.FC<Props> = ({ customer }) => {
  const [loading, setLoading] = useState(false);
  const api = useAPI();

  const dispatch = useDispatch();

  const flipPrivacyMode = useCallback(async () => {
    // TODO - move `loading` state to redux
    setLoading(true);
    await dispatch(
      setPrivacyMode(api, oppositePrivacyMode(customer.privacy_mode))
    );
    setLoading(false);
  }, [api, dispatch, customer.privacy_mode]);

  return (
    <HeadedFragment title="Настройки приватности">
      <Column centered>
        <PrivacyTv mode={customer.privacy_mode} />
        <div>
          Ваше присутствие{' '}
          <strong>
            {customer.privacy_mode == 'public'
              ? 'отображается'
              : 'не отображается'}
          </strong>{' '}
          на <A href="https://now.kocherga.club">now.kocherga.club</A> и
          телевизорах в Кочерге.
        </div>
        <Button onClick={flipPrivacyMode} loading={loading} disabled={loading}>
          {customer.privacy_mode == 'public' ? 'Отключить' : 'Включить'}
        </Button>
      </Column>
    </HeadedFragment>
  );
};

const MaybePrivacySettings: React.FC<{ customer?: Customer }> = ({
  customer,
}) => {
  if (!customer) {
    return null;
  }
  return <PrivacySettings customer={customer} />;
};

export default connect((state: State) => ({ customer: selectCustomer(state) }))(
  MaybePrivacySettings
);
