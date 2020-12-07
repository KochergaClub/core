import { parseISO } from 'date-fns';
import React from 'react';
import Markdown from 'react-markdown';
import breaks from 'remark-breaks';

import { TypedDocumentNode } from '@apollo/client';

import { ButtonWithModal, HumanizedDateTime } from '~/components';
import { SmartMutationResult } from '~/components/forms/hooks';
import { SmartMutationModal } from '~/components/forms/SmartMutationModal';
import { UserLink } from '~/components/UserLink';
import { Column, Row } from '~/frontkit';

import { CommentableFragment, CommentFragment } from './queries.generated';

type CommentProps = {
  comment: CommentFragment;
};

const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <div>
      <Row>
        <strong>
          <UserLink user={comment.author} />
        </strong>
        <em>
          (<HumanizedDateTime date={parseISO(comment.created)} />)
        </em>
      </Row>
      <Markdown source={comment.text} plugins={[breaks]} />
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
        <Comment key={comment.id} comment={comment} />
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
