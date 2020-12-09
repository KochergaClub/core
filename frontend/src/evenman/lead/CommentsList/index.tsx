import { parseISO } from 'date-fns';
import React from 'react';

import { TypedDocumentNode } from '@apollo/client';

import { SmartMutationResult } from '~/common/hooks';
import { ButtonWithModal, HumanizedDateTime, Markdown } from '~/components';
import { SmartMutationModal } from '~/components/forms/SmartMutationModal';
import { SmartMutationButton } from '~/components/SmartMutationButton';
import { UserLink } from '~/components/UserLink';
import { Column, Row } from '~/frontkit';

import {
    CommentableFragment, CommentFragment, DeleteCommentDocument, EditCommentDocument
} from './queries.generated';

type CommentProps = {
  commentable: CommentableFragment;
  comment: CommentFragment;
};

const Comment: React.FC<CommentProps> = ({ comment, commentable }) => {
  return (
    <div>
      <Row>
        <strong>
          <UserLink user={comment.author} />
        </strong>
        <em>
          (<HumanizedDateTime date={parseISO(comment.created)} />)
        </em>
        <SmartMutationButton
          mutation={DeleteCommentDocument}
          variables={{ id: comment.id }}
          expectedTypename="BasicResult"
          size="small"
          confirmText="Удалить комментарий?"
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
        >
          Удалить
        </SmartMutationButton>
        <ButtonWithModal title="Редактировать" size="small">
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
        </ButtonWithModal>
      </Row>
      <Markdown source={comment.text} />
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
