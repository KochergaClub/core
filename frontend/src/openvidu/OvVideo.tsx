import React from 'react';
import { Subscriber } from 'openvidu-browser';

interface Props {
  streamManager: Subscriber;
}

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
    return <video autoPlay={true} ref={this.videoRef} />;
  }
}
