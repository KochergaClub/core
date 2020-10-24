import { useCallback } from 'react';
import { FaGlobe, FaLock } from 'react-icons/fa';
import styled from 'styled-components';

import { useMutation } from '@apollo/client';
import { A, Column } from '~/frontkit';

import { AsyncButton } from '~/components';

import { MyPrivacyModeSetDocument, MySettingsPageFragment } from '../queries.generated';
import HeadedFragment from './HeadedFragment';
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
  membership: NonNullable<MySettingsPageFragment['membership']>;
}

const PrivacySettings: React.FC<Props> = ({ membership }) => {
  const [setPrivacyModeMutation] = useMutation(MyPrivacyModeSetDocument, {
    refetchQueries: ['MySettingsPage'],
    awaitRefetchQueries: true,
  });

  const flipPrivacyMode = useCallback(async () => {
    await setPrivacyModeMutation({
      variables: {
        mode: oppositePrivacyMode(membership.privacy_mode),
      },
    });
  }, [setPrivacyModeMutation, membership.privacy_mode]);

  return (
    <HeadedFragment title="Настройки приватности">
      <Column centered>
        <PrivacyTv mode={membership.privacy_mode} />
        <div>
          Ваше присутствие{' '}
          <strong>
            {membership.privacy_mode == 'public'
              ? 'отображается'
              : 'не отображается'}
          </strong>{' '}
          на странице <A href="/now">/now</A> и телевизорах в Кочерге.
        </div>
        <AsyncButton act={flipPrivacyMode}>
          {membership.privacy_mode == 'public' ? 'Отключить' : 'Включить'}
        </AsyncButton>
      </Column>
    </HeadedFragment>
  );
};

export default PrivacySettings;
