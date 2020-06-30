import { useCallback, useEffect, useState } from 'react';
import {
  OpenVidu,
  Session,
  Publisher,
  StreamEvent,
  Subscriber,
} from 'openvidu-browser';

const OV = new OpenVidu();

export const useOpenViduSession = (getToken: () => Promise<string>) => {
  const [session, setSession] = useState<Session | undefined>(undefined);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [publisher, setPublisher] = useState<Publisher | undefined>(undefined);

  const leaveSession = useCallback(() => {
    if (!session) {
      return;
    }
    session.disconnect();
    setSession(undefined);
    setSubscribers([]);
    setPublisher(undefined);
  }, [session]);

  useEffect(() => {
    window.addEventListener('beforeunload', leaveSession);
    return () => {
      window.removeEventListener('beforeunload', leaveSession);
      leaveSession();
    };
  }, [leaveSession]);

  const joinSession = useCallback(async () => {
    if (session) {
      leaveSession();
    }

    const newSession = OV.initSession();

    newSession.on('streamCreated', untypedEvent => {
      const event = untypedEvent as StreamEvent;
      // Subscribe to the Stream to receive it. Second parameter is undefined
      // so OpenVidu doesn't create an HTML video by its own
      const subscriber = newSession.subscribe(event.stream, undefined as any);

      // Update the state with the new subscribers
      setSubscribers(subscribers => [...subscribers, subscriber]);
    });

    newSession.on('streamDestroyed', untypedEvent => {
      const event = untypedEvent as StreamEvent;

      setSubscribers(subscribers =>
        subscribers.filter(
          subscriber => subscriber !== event.stream.streamManager
        )
      );
    });

    const token = await getToken();

    // Please never add metadata (clientData) here, since we use serverData (which is more secure)
    // and OpenVidu uses strange encoding when you use both.
    await newSession.connect(token);

    // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
    // element: we will manage it on our own) and with the desired properties
    const publisher = OV.initPublisher(undefined as any, {
      audioSource: undefined, // The source of audio. If undefined default microphone
      videoSource: undefined, // The source of video. If undefined default webcam
      publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
      publishVideo: true, // Whether you want to start publishing with your video enabled or not
      resolution: '1280x720',
    });

    newSession.publish(publisher);
    setPublisher(publisher);

    setSession(newSession);
  }, [session, leaveSession, getToken]);

  return {
    session,
    subscribers,
    publisher,
    joinSession,
    leaveSession,
  };
};
