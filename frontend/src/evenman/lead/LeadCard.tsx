import { parseISO } from 'date-fns';
import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import styled from 'styled-components';

import { CommunityLeadStatus } from '~/apollo/types.generated';
import { ButtonWithModal, DropdownMenu, HumanizedDateTime } from '~/components';
import { ModalAction, MutationAction } from '~/components/DropdownMenu';
import { SmartMutationModal } from '~/components/forms/SmartMutationModal';
import { Badge, Column, fonts, HR, RichText, Row } from '~/frontkit';

import { EditLeadModal } from './EditLeadModal';
import {
    BecomeEvenmanLeadCuratorDocument, ClearEvenmanLeadCuratorDocument,
    CommentOnCommunityLeadDocument, DeleteEvenmanLeadDocument, EvenmanLeadFragment
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

const SmallRichText = styled(RichText)`
  font-size: ${fonts.sizes.XS};
`;

type Props = {
  lead: EvenmanLeadFragment;
};

const LeadComments: React.FC<Props> = ({ lead }) => {
  return (
    <Column>
      <strong>Комментарии</strong>
      {lead.comments.map((comment) => (
        <SmallRichText
          key={comment.id}
          dangerouslySetInnerHTML={{ __html: comment.text }}
        />
      ))}
      <ButtonWithModal title="Добавить" size="small">
        {({ close }) => (
          <SmartMutationModal
            close={close}
            title="Добавить комментарий"
            submitLabel="Добавить"
            shape={
              [
                {
                  name: 'text',
                  type: 'richtext',
                  title: 'Текст',
                },
              ] as const
            }
            valuesToVariables={(v) => ({
              input: {
                lead_id: lead.id,
                text: v.text,
              },
            })}
            expectedTypename="CommunityLead"
            mutation={CommentOnCommunityLeadDocument}
          />
        )}
      </ButtonWithModal>
    </Column>
  );
};

export const LeadCard: React.FC<Props> = ({ lead }) => {
  return (
    <Column stretch>
      <Row vCentered>
        <span>#{lead.id}</span>
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
        <div>
          <HR />
          <SmallRichText
            dangerouslySetInnerHTML={{ __html: lead.description }}
          />
        </div>
      ) : null}
      <div>
        <HR />
        <LeadComments lead={lead} />
      </div>
    </Column>
  );
};
