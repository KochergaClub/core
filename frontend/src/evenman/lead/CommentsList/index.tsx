import { parseISO } from 'date-fns';
import React from 'react';
import { FaEdit, FaRegComment, FaTrash } from 'react-icons/fa';
import styled from 'styled-components';

import { TypedDocumentNode } from '@apollo/client';

import { SmartMutationResult } from '~/common/hooks';
import { ButtonWithModal, DropdownMenu, HumanizedDateTime, Markdown } from '~/components';
import { ModalAction, SmartMutationAction } from '~/components/DropdownMenu';
import { SmartMutationModal } from '~/components/forms/SmartMutationModal';
import { UserLink } from '~/components/UserLink';
import { colors, Column, Row } from '~/frontkit';

import {
    CommentableFragment, CommentFragment, DeleteCommentDocument, EditCommentDocument
} from './queries.generated';

type CommentProps = {
  commentable: CommentableFragment;
  comment: CommentFragment;
};

const CommentIcon = styled(FaRegComment)`
  color: ${colors.grey[500]};
  margin-top: 4px;
  flex-shrink: 0;
`;

const Comment: React.FC<CommentProps> = ({ comment, commentable }) => {
  return (
    <div>
      <Row gutter={8}>
        <CommentIcon />
        <div>
          <Row vCentered gutter={8}>
            <strong>
              <UserLink user={comment.author} />
            </strong>
            <span>·</span>
            <small>
              <em>
                <HumanizedDateTime date={parseISO(comment.created)} />
              </em>
            </small>
            <DropdownMenu>
              <ModalAction title="Редактировать" icon={FaEdit}>
                {({ close }) => (
                  <SmartMutationModal
                    close={close}
                    title="Редактирование комментария"
                    submitLabel="Сохранить"
                    shape={
                      [
                        {
                          name: 'text',
                          type: 'markdown',
                          title: 'Текст',
                        },
                      ] as const
                    }
                    defaultValues={{ text: comment.text }}
                    valuesToVariables={(v) => ({
                      input: { id: comment.id, text: v.text },
                    })}
                    expectedTypename="Comment"
                    mutation={EditCommentDocument}
                  />
                )}
              </ModalAction>
              <SmartMutationAction
                mutation={DeleteCommentDocument}
                variables={{ id: comment.id }}
                expectedTypename="BasicResult"
                confirmText="Удалить комментарий?"
                title="Удалить"
                icon={FaTrash}
                updateCache={(cache) => {
                  cache.modify({
                    id: cache.identify(commentable),
                    fields: {
                      comments(existingCommentRefs, { readField }) {
                        return existingCommentRefs.filter(
                          (commentRef: any) =>
                            comment.id !== readField('id', commentRef)
                        );
                      },
                    },
                  });
                }}
              />
            </DropdownMenu>
          </Row>
          <Markdown source={comment.text} />
        </div>
      </Row>
      <hr />
    </div>
  );
};

type Props = {
  commentable: CommentableFragment;
  create: {
    typename: string;
    mutation: TypedDocumentNode<SmartMutationResult, unknown>;
    valuesToVariables: (v: { text: string }) => unknown;
  };
};

export const CommentsList: React.FC<Props> = ({ commentable, create }) => {
  return (
    <Column stretch>
      {commentable.comments.map((comment) => (
        <Comment key={comment.id} comment={comment} commentable={commentable} />
      ))}
      <div>
        <ButtonWithModal title="Добавить комментарий" size="small">
          {({ close }) => (
            <SmartMutationModal
              close={close}
              title="Добавить комментарий"
              submitLabel="Добавить"
              shape={
                [
                  {
                    name: 'text',
                    type: 'markdown',
                    title: 'Текст',
                  },
                ] as const
              }
              valuesToVariables={create.valuesToVariables}
              expectedTypename={create.typename}
              mutation={create.mutation}
            />
          )}
        </ButtonWithModal>
      </div>
    </Column>
  );
};
