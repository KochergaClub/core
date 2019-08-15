import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import styled from 'styled-components';

import { A, Column, Row } from '@kocherga/frontkit';

import { useAPI, usePermissions } from '~/common/hooks';
import AsyncButton from '~/components/AsyncButton';

import { Member } from '../types';
import { grantGooglePermissions } from '../api';
import { fireMember } from '../actions';
import { selectViewingMember } from '../selectors';

const Ex = styled.div`
  background-color: #ddd;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8em;
`;

const Image = styled.img`
  width: 300px;
  height: auto;
`;

interface Props {
  member: Member;
}

const ManagerControls: React.FC<Props> = ({ member }) => {
  const api = useAPI();
  const dispatch = useDispatch();

  const handleGrantGooglePermissions = useCallback(async () => {
    await grantGooglePermissions(api, member.id);
  }, [api, member.id]);

  const fire = useCallback(async () => {
    await dispatch(fireMember(member));
  }, [api, member.id]);

  if (member.role !== 'WATCHMAN') {
    return null;
  }

  if (!member.is_current) {
    return null;
  }

  return (
    <Row>
      <AsyncButton small act={handleGrantGooglePermissions}>
        Выдать права в Google
      </AsyncButton>

      <AsyncButton small act={fire}>
        Уволить
      </AsyncButton>
    </Row>
  );
};

const MemberProfile: React.FC<{}> = () => {
  const member = useSelector(selectViewingMember);
  const [current_user_is_manager] = usePermissions(['staff.manage']);

  if (!member) {
    throw new Error('Redux logic error');
  }

  return (
    <Column centered gutter={20} style={{ marginBottom: 100 }}>
      <Column centered gutter={0}>
        <h1>{member.full_name}</h1>
        <h2 style={{ color: member.color || 'black' }}>{member.short_name}</h2>
        <div>{member.email}</div>
        {member.is_current || <Ex>Бывший сотрудник</Ex>}
      </Column>
      <Column centered>
        {member.slack_image && <Image src={member.slack_image} />}
        {member.slack_id && (
          <A href={`https://kocherga.slack.com/messages/${member.slack_id}/`}>
            Написать в Slack
          </A>
        )}
        {member.vk && <A href={member.vk}>Профиль VK</A>}
      </Column>
      {current_user_is_manager && (
        <Column centered>
          <ManagerControls member={member} />
        </Column>
      )}
    </Column>
  );
};

export default MemberProfile;
