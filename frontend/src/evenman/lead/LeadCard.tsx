import { parseISO } from 'date-fns';
import Link from 'next/link';
import React from 'react';
import { FaEdit, FaLink, FaTrash } from 'react-icons/fa';
import Markdown from 'react-markdown';
import breaks from 'remark-breaks';

import { CommunityLeadStatus } from '~/apollo/types.generated';
import { useUser } from '~/common/hooks';
import { DropdownMenu, HumanizedDateTime, MutationButton } from '~/components';
import { ModalAction, MutationAction } from '~/components/DropdownMenu';
import { UserLink } from '~/components/UserLink';
import { A, Badge, Column, Row } from '~/frontkit';

import { evenmanEventRoute } from '../routes';
import { AddEventToLeadModal } from './AddEventToLeadModal';
import { CommentsList } from './CommentsList';
import { EditLeadModal } from './EditLeadModal';
import {
    BecomeEvenmanLeadCuratorDocument, ClearEvenmanLeadCuratorDocument,
    CommentOnCommunityLeadDocument, DeleteEvenmanLeadDocument, EvenmanLeadFragment,
    RemoveEventFromCommunityLeadDocument
} from './queries.generated';
import { statusNames } from './utils';

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

export const LeadCard: React.FC<Props> = ({ lead }) => {
  const user = useUser();
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
          {lead.curated_by?.id !== user.id ? (
            <MutationAction
              title="Стать куратором"
              mutation={BecomeEvenmanLeadCuratorDocument}
              refetchQueries={['EvenmanLeads']}
              variables={{ id: lead.id }}
            />
          ) : null}
          {lead.curated_by ? (
            <MutationAction
              title="Очистить куратора"
              mutation={ClearEvenmanLeadCuratorDocument}
              refetchQueries={['EvenmanLeads']}
              variables={{ id: lead.id }}
            />
          ) : null}
          {
            <ModalAction title="Связать с событием" icon={FaLink}>
              {({ close }) => <AddEventToLeadModal close={close} lead={lead} />}
            </ModalAction>
          }
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
            <UserLink user={lead.created_by} />
          </Row>
        </small>
      )}
      {lead.curated_by || lead.status !== CommunityLeadStatus.Inactive ? (
        <small>
          <Row>
            <div>Куратор:</div>
            {lead.curated_by ? (
              <UserLink user={lead.curated_by} />
            ) : (
              <Badge type="accent">отсутствует</Badge>
            )}
          </Row>
        </small>
      ) : null}
      <small>
        <Row>
          <div>Статус:</div>
          <Status status={lead.status} />
        </Row>
      </small>
      {lead.events.length ? (
        <div>
          <hr />
          <div>События:</div>
          {lead.events.map((event) => (
            <Row key={event.id}>
              <Link href={evenmanEventRoute(event.id)} passHref>
                <A>{event.title}</A>
              </Link>
              <div>
                (<HumanizedDateTime date={parseISO(event.start)} />)
              </div>
              <MutationButton
                mutation={RemoveEventFromCommunityLeadDocument}
                variables={{ input: { lead_id: lead.id, event_id: event.id } }}
                size="small"
                confirmText="Отвязать событие от лида?"
              >
                Отвязать
              </MutationButton>
            </Row>
          ))}
        </div>
      ) : null}
      {lead.description ? (
        <div>
          <hr />
          <Markdown source={lead.description} plugins={[breaks]} />
        </div>
      ) : null}
      <div>
        <hr />
        <CommentsList
          commentable={lead}
          create={{
            typename: 'CommunityLead',
            mutation: CommentOnCommunityLeadDocument,
            valuesToVariables: (v) => ({
              input: {
                lead_id: lead.id,
                text: v.text,
              },
            }),
          }}
        />
      </div>
    </Column>
  );
};
