import React from 'react';

import { ButtonWithModal, YoutubeEmbed } from '~/components';
import { SmartMutationModal } from '~/components/forms/SmartMutationModal';
import { SmartMutationButton } from '~/components/SmartMutationButton';

import {
    EvenmanAddYoutubeVideoDocument, EvenmanDeleteYoutubeVideoDocument, EvenmanEvent_DetailsFragment
} from './queries.generated';

interface Props {
  event: EvenmanEvent_DetailsFragment;
}

export const EventVideos: React.FC<Props> = ({ event }) => {
  return (
    <div className="space-y-2">
      <ButtonWithModal title="Добавить видео" size="small">
        {({ close }) => (
          <SmartMutationModal
            title="Добавить видео"
            close={close}
            mutation={EvenmanAddYoutubeVideoDocument}
            valuesToVariables={(v) => ({
              input: {
                ...v,
                event_id: event.id,
              },
            })}
            expectedTypename="Event"
            shape={
              [
                {
                  name: 'embed_id',
                  type: 'string',
                },
              ] as const
            }
          />
        )}
      </ButtonWithModal>
      <div className="space-y-2">
        {event.youtube_videos.length
          ? event.youtube_videos.map((video) => (
              <div key={video.id} className="flex items-start space-x-1">
                <div className="max-w-sm flex-1">
                  <YoutubeEmbed embedId={video.embed_id} />
                </div>
                <SmartMutationButton
                  mutation={EvenmanDeleteYoutubeVideoDocument}
                  expectedTypename="BasicResult"
                  confirmText="Удалить видео с сайта? (Видео останется на youtube-канале, если оно ещё существует.)"
                  size="small"
                  refetchQueries={['EvenmanEvent']}
                  variables={{
                    id: video.id,
                  }}
                >
                  Удалить
                </SmartMutationButton>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};
