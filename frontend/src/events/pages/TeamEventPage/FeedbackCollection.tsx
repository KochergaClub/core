import React, { useCallback } from 'react';

import { useMutation } from '@apollo/client';

import { MutationButton } from '~/components';
import { Collection, ShapedTableView } from '~/components/collections';
import { FormShape } from '~/components/forms/types';
import {
    EventFeedbackCreateDocument, EventFeedbackDeleteDocument, TeamEventDetailsFragment,
    TeamEventFeedbackFragment
} from '~/events/queries.generated';
import shapes from '~/shapes';

const feedbackShape: FormShape = shapes.events.feedback.filter(
  (f) => f.name !== 'event_id' && f.name !== 'id'
);

const DeleteFeedback: React.FC<{ feedback: TeamEventFeedbackFragment }> = ({
  feedback,
}) => {
  return (
    <MutationButton
      mutation={EventFeedbackDeleteDocument}
      refetchQueries={['TeamEventDetails']}
      confirmText="Точно удалить?"
      variables={{
        id: feedback.id,
      }}
    >
      Удалить
    </MutationButton>
  );
};

interface Props {
  event: TeamEventDetailsFragment;
}

const FeedbackCollection: React.FC<Props> = ({ event }) => {
  const feedbacks = event.feedbacks;
  const [createMutation] = useMutation(EventFeedbackCreateDocument, {
    refetchQueries: ['TeamEventDetails'],
    awaitRefetchQueries: true,
  });

  const add = useCallback(
    async (values: any) => {
      const toInt = (v?: string) =>
        v === undefined ? undefined : parseInt(v, 10);
      await createMutation({
        variables: {
          ...values,
          overall_score: toInt(values.overall_score as string | undefined),
          recommend_score: toInt(values.recommend_score as string | undefined),
          content_score: toInt(values.content_score as string | undefined),
          conductor_score: toInt(values.conductor_score as string | undefined),
          event_id: event.id,
        },
      });
    },
    [createMutation, event.id]
  );

  const renderExtraColumn = (feedback: TeamEventFeedbackFragment) => (
    <DeleteFeedback feedback={feedback} />
  );

  return (
    <Collection
      names={{
        plural: 'отзывы',
        genitive: 'отзыв',
      }}
      items={feedbacks}
      add={{
        cb: add,
        shape: feedbackShape,
      }}
      view={({ items }) => (
        <ShapedTableView
          items={items}
          shape={feedbackShape}
          extraColumns={['Удалить']}
          renderExtraColumn={renderExtraColumn}
        />
      )}
    />
  );
};

export default FeedbackCollection;
