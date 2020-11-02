import { Device, OpenVidu, PublisherProperties } from 'openvidu-browser';
import { useCallback, useEffect, useRef, useState } from 'react';
import Select from 'react-select';
import styled from 'styled-components';

import { Column, Label, Row } from '~/frontkit';

import { AsyncButton, PaddedBlock, Spinner } from '~/components';

import MuteAudioButton from './MuteAudioButton';
import MuteVideoButton from './MuteVideoButton';

const PreviewVideo = styled.video`
  height: 300px;
  width: auto;
`;

interface LimitedPublisherProperties {
  videoSource?: string;
  audioSource?: string;
  publishVideo: boolean;
  publishAudio: boolean;
}

interface DevicePickerProps {
  kind: 'audioinput' | 'videoinput';
  current?: string;
  pick: (id: string) => Promise<void>;
  devices: Device[];
}

const DevicePicker: React.FC<DevicePickerProps> = ({
  kind,
  current,
  pick,
  devices,
}) => {
  const [loading, setLoading] = useState(false);

  type MyOption = { value: string; label: string };
  const options: MyOption[] = devices
    .filter((d) => d.kind === kind)
    .map((d) => ({
      value: d.deviceId,
      label: d.label,
    }));
  const currentOption = options.find((o) => o.value && o.value === current);
  return (
    <Select
      options={options}
      value={currentOption}
      onChange={async (selected) => {
        if (!selected || Array.isArray(selected)) {
          throw new Error('react-select is weird'); // shouldn't happen
        }
        setLoading(true);
        await pick((selected as MyOption).value);
        setLoading(false);
      }}
      isLoading={loading}
    />
  );
};

interface Props {
  ov: OpenVidu;
  joinSession: (props: PublisherProperties) => Promise<void>;
}

const JoinSettings: React.FC<Props> = ({ ov, joinSession }) => {
  const [devices, setDevices] = useState<Device[] | undefined>();
  const [error, setError] = useState<DOMException | undefined>(undefined);
  const previewRef = useRef<HTMLVideoElement | null>();

  const [publisherProperties, setPublisherProperties] = useState<
    LimitedPublisherProperties
  >({
    audioSource: undefined,
    videoSource: undefined,
    publishAudio: true,
    publishVideo: true,
  });

  // configure initial MediaStream
  useEffect(() => {
    (async () => {
      try {
        const um = await ov.getUserMedia({}); // need access to at least one device before we can display device labels
        const devices = await ov.getDevices();
        setPublisherProperties({
          audioSource: um.getAudioTracks()[0].getSettings().deviceId,
          videoSource: um.getVideoTracks()[0].getSettings().deviceId,
          publishAudio: true,
          publishVideo: true,
        });
        setDevices(devices);
      } catch (e) {
        setError(e);
      }
    })();
  }, [ov]);

  const updatePreview = useCallback(
    async (pp: LimitedPublisherProperties) => {
      if (!previewRef.current) {
        return;
      }
      const um = await ov.getUserMedia(pp);
      if (!pp.publishAudio) {
        um.getAudioTracks()[0].enabled = false;
      }
      if (!pp.publishVideo) {
        um.getVideoTracks()[0].enabled = false;
      }
      previewRef.current.srcObject = um;
    },
    [ov]
  );

  const setPreviewRef = useCallback(
    (node: HTMLVideoElement) => {
      previewRef.current = node;
      updatePreview(publisherProperties);
    },
    [updatePreview, publisherProperties]
  );

  useEffect(() => {
    updatePreview(publisherProperties);
  }, [updatePreview, publisherProperties]);

  const enter = useCallback(async () => {
    if (!publisherProperties) {
      return; // can't enter when not configured yet
    }
    joinSession(publisherProperties);
  }, [publisherProperties, joinSession]);

  const setVideoDevice = useCallback(
    async (id: string) => {
      const um = await ov.getUserMedia({
        audioSource: false,
        videoSource: id,
      });
      if (previewRef.current) {
        const previewUm = previewRef.current.srcObject as
          | MediaStream
          | undefined;
        if (previewUm) {
          previewUm.removeTrack(previewUm.getVideoTracks()[0]);
          previewUm.addTrack(um.getVideoTracks()[0]);
        } else {
          previewRef.current.srcObject = um;
        }
      }
      setPublisherProperties((pp) => ({
        ...pp,
        videoSource: id,
      }));
    },
    [ov]
  );

  const setAudioDevice = useCallback(
    async (id: string) => {
      const um = await ov.getUserMedia({
        audioSource: id,
        videoSource: false,
      });
      if (previewRef.current) {
        const previewUm = previewRef.current.srcObject as
          | MediaStream
          | undefined;
        if (previewUm) {
          previewUm.removeTrack(previewUm.getAudioTracks()[0]);
          previewUm.addTrack(um.getAudioTracks()[0]);
        } else {
          previewRef.current.srcObject = um;
        }
      }
      setPublisherProperties((pp) => ({
        ...pp,
        audioSource: id,
      }));
    },
    [ov]
  );

  const muteVideo = useCallback(() => {
    setPublisherProperties((pp) => {
      const publishVideo = !pp.publishVideo;
      return { ...pp, publishVideo };
    });
  }, []);

  const muteAudio = useCallback(() => {
    setPublisherProperties((pp) => {
      const publishAudio = !pp.publishAudio;
      return { ...pp, publishAudio };
    });
  }, []);

  return (
    <PaddedBlock>
      {devices ? (
        <Column stretch>
          <h2>Превью и настройки</h2>
          <Row gutter={20} vCentered wrap>
            <div style={{ flex: 1 }}>
              <PreviewVideo ref={setPreviewRef} autoPlay={true} />
            </div>
            <div style={{ flex: 1 }}>
              <Column stretch>
                <div>
                  <Label>Видео</Label>
                  <DevicePicker
                    kind="videoinput"
                    current={publisherProperties.videoSource}
                    pick={async (v) => await setVideoDevice(v)}
                    devices={devices}
                  />
                  <MuteVideoButton
                    flip={muteVideo}
                    active={publisherProperties.publishVideo}
                  />
                </div>
                <div>
                  <Label>Аудио</Label>
                  <DevicePicker
                    kind="audioinput"
                    current={publisherProperties.audioSource}
                    pick={async (v) => await setAudioDevice(v)}
                    devices={devices}
                  />
                  <MuteAudioButton
                    flip={muteAudio}
                    active={publisherProperties.publishAudio}
                  />
                </div>
              </Column>
            </div>
          </Row>
          <AsyncButton act={enter} kind="primary">
            Войти
          </AsyncButton>
        </Column>
      ) : error ? (
        <div>
          <h1>Ошибка</h1>
          <div>{error.name}</div>
          <div>{error.message}</div>
        </div>
      ) : (
        <Spinner size="block" />
      )}
    </PaddedBlock>
  );
};

export default JoinSettings;
