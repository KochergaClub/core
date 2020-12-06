import { parseISO } from 'date-fns';
import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import styled from 'styled-components';

import { CommunityLeadStatus } from '~/apollo/types.generated';
import { DropdownMenu, HumanizedDateTime } from '~/components';
import { ModalAction, MutationAction } from '~/components/DropdownMenu';
import { Badge, Column, HR, RichText, Row } from '~/frontkit';

import { EditLeadModal } from './EditLeadModal';
import {
    BecomeEvenmanLeadCuratorDocument, ClearEvenmanLeadCuratorDocument, DeleteEvenmanLeadDocument,
    EvenmanLeadFragment
} from './queries.generated';
import { statusNames } from './utils';

const UserSpan: React.FC<{
  user: { id: string; first_name: string; last_name: string };
}> = ({ user }) => {
  return (
    <div>
      {user.first_name
        ? `${user.first_name} ${user.last_name}`
        : `Анон#${user.id}`}
    </div>
  );
};

const Status: React.FC<{ status: CommunityLeadStatus }> = ({ status }) => {
  return (
    <Badge type={status === CommunityLeadStatus.Active ? 'good' : 'default'}>
      {statusNames[status] || status}
    </Badge>
  );
};

type Props = {
  lead: EvenmanLeadFragment;
};

const DescriptionContainer = styled.div`
  font-size: 0.8em;
`;

export const LeadCard: React.FC<Props> = ({ lead }) => {
  return (
    <Column stretch>
      <Row vCentered>
        <strong>{lead.name}</strong>
        <DropdownMenu>
          <ModalAction title="Редактировать" icon={FaEdit}>
            {({ close }) => <EditLeadModal close={close} lead={lead} />}
          </ModalAction>
          <MutationAction
            title="Удалить"
            icon={FaTrash}
            mutation={DeleteEvenmanLeadDocument}
            variables={{ id: lead.id }}
            refetchQueries={['EvenmanLeads']}
            confirmText={`Удалить ${lead.name}?`}
          />
          <MutationAction
            title="Стать куратором"
            mutation={BecomeEvenmanLeadCuratorDocument}
            refetchQueries={['EvenmanLeads']}
            variables={{ id: lead.id }}
          />
          {lead.curated_by ? (
            <MutationAction
              title="Очистить куратора"
              mutation={ClearEvenmanLeadCuratorDocument}
              refetchQueries={['EvenmanLeads']}
              variables={{ id: lead.id }}
            />
          ) : null}
        </DropdownMenu>
      </Row>
      <small>
        <Row>
          <div>Создан:</div>
          <HumanizedDateTime date={parseISO(lead.created)} />
        </Row>
      </small>
      <small>
        <Row>
          <div>Последнее обновление:</div>
          <HumanizedDateTime date={parseISO(lead.updated)} />
        </Row>
      </small>
      {lead.created_by && (
        <small>
          <Row>
            <div>Кем создан:</div>
            <UserSpan user={lead.created_by} />
          </Row>
        </small>
      )}
      {lead.curated_by && (
        <small>
          <Row>
            <div>Куратор:</div>
            <UserSpan user={lead.curated_by} />
          </Row>
        </small>
      )}
      <small>
        <Row>
          <div>Статус:</div>
          <Status status={lead.status} />
        </Row>
      </small>
      {lead.description ? (
        <DescriptionContainer>
          <HR />
          <RichText dangerouslySetInnerHTML={{ __html: lead.description }} />
        </DescriptionContainer>
      ) : null}
    </Column>
  );
};
