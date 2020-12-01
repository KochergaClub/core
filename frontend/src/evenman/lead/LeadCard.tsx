import { parseISO } from 'date-fns';
import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import styled from 'styled-components';

import { DropdownMenu, HumanizedDateTime } from '~/components';
import { ModalAction, MutationAction } from '~/components/DropdownMenu';
import { Column, HR, RichText, Row } from '~/frontkit';

import { EditLeadModal } from './EditLeadModal';
import { DeleteEvenmanLeadDocument, EvenmanLeadFragment } from './queries.generated';

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
        </DropdownMenu>
      </Row>
      <small>
        <Row>
          <div>Создан:</div>
          <HumanizedDateTime date={parseISO(lead.created)} />
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
      <small>
        <Row>
          <div>Обновлён:</div>
          <HumanizedDateTime date={parseISO(lead.updated)} />
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
