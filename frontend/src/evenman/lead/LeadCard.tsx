import { parseISO } from 'date-fns';
import Link from 'next/link';
import React from 'react';
import { FaEdit, FaLink, FaTrash, FaUserCheck, FaUserMinus } from 'react-icons/fa';
import { MdInfo } from 'react-icons/md';

import Tippy from '@tippyjs/react';

import { CommunityLeadStatus } from '~/apollo/types.generated';
import { useUser } from '~/common/hooks';
import { DropdownMenu, HumanizedDateTime, Markdown, MutationButton } from '~/components';
import { CardSection } from '~/components/cards';
import { ModalAction, MutationAction } from '~/components/DropdownMenu';
import { UserLink } from '~/components/UserLink';
import { A, Badge, Column, Row } from '~/frontkit';

import { evenmanEventRoute, leadDetailsRoute } from '../routes';
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

const LeadMoreInfo: React.FC<Props> = ({ lead }) => {
  return (
    <Tippy
      content={
        <Column>
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
        </Column>
      }
    >
      <div className="flex cursor-pointer text-gray-400 hover:text-gray-600">
        <MdInfo />
      </div>
    </Tippy>
  );
};

export const LeadCard: React.FC<Props> = ({ lead }) => {
  const user = useUser();
  return (
    <Column stretch gutter={16}>
      <Row vCentered>
        <Link href={leadDetailsRoute(lead.id)} passHref>
          <A>#{lead.id}</A>
        </Link>
        <strong>{lead.name}</strong>
        <DropdownMenu>
          <ModalAction title="Редактировать" icon={FaEdit}>
            {({ close }) => <EditLeadModal close={close} lead={lead} />}
          </ModalAction>
          {lead.curated_by?.id !== user.id ? (
            <MutationAction
              title="Стать куратором"
              icon={FaUserCheck}
              mutation={BecomeEvenmanLeadCuratorDocument}
              refetchQueries={['EvenmanLeads']}
              variables={{ id: lead.id }}
            />
          ) : null}
          {lead.curated_by ? (
            <MutationAction
              title="Очистить куратора"
              icon={FaUserMinus}
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
          <MutationAction
            title="Удалить"
            icon={FaTrash}
            mutation={DeleteEvenmanLeadDocument}
            variables={{ id: lead.id }}
            refetchQueries={['EvenmanLeads']}
            confirmText={`Удалить ${lead.name}?`}
          />
        </DropdownMenu>
        <LeadMoreInfo lead={lead} />
      </Row>
      <Column>
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
      </Column>
      {lead.events.length ? (
        <CardSection title="События">
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
                confirmText={`Отвязать событие ${event.title} от лида?`}
              >
                Отвязать
              </MutationButton>
            </Row>
          ))}
        </CardSection>
      ) : null}
      {lead.description ? (
        <CardSection title="Описание">
          <Markdown source={lead.description} />
        </CardSection>
      ) : null}
      <CardSection title="Комментарии">
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
      </CardSection>
    </Column>
  );
};
