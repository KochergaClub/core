import React from 'react';
import styled from 'styled-components';
import { StreamManager } from 'openvidu-browser';

interface Props {
  streamManager: StreamManager;
}

const Video = styled.video`
  width: 100%;
`;

export default class OvVideo extends React.Component<Props> {
  videoRef: React.RefObject<HTMLVideoElement>;

  constructor(props: Props) {
    super(props);
    this.videoRef = React.createRef();
  }

  componentDidUpdate(props: Props) {
    if (props && this.videoRef.current) {
      this.props.streamManager.addVideoElement(this.videoRef.current);
    }
  }

  componentDidMount() {
    if (this.props && this.videoRef.current) {
      this.props.streamManager.addVideoElement(this.videoRef.current);
    }
  }

  render() {
    return <Video autoPlay={true} ref={this.videoRef} />;
  }
}
