import { parseISO } from 'date-fns';
import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import styled from 'styled-components';

import { DropdownMenu, HumanizedDateTime } from '~/components';
import { ModalAction, MutationAction } from '~/components/DropdownMenu';
import { Column, HR, RichText, Row } from '~/frontkit';

import { EditLeadModal } from './EditLeadModal';
import { DeleteEvenmanLeadDocument, EvenmanLeadFragment } from './queries.generated';

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
        Создан: <HumanizedDateTime date={parseISO(lead.created)} />
      </small>
      <small>
        Обновлён: <HumanizedDateTime date={parseISO(lead.updated)} />
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
