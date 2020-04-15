import { RefObject } from 'react';
import * as React from 'react';

import { A } from '@kocherga/frontkit';

import BinaryIndicator from './BinaryIndicator';

import EditableString from './EditableString';

export interface Props {
  value: string | undefined;
  title: string;
  save: (value: string) => Promise<any>;
}

class EditableLink extends React.Component<Props, {}> {
  hasValue() {
    return Boolean(this.props.value);
  }

  renderBinaryIndicator = () => {
    return <BinaryIndicator status={this.hasValue()} />;
  };

  renderValue = (ref?: RefObject<HTMLElement>) => {
    if (!this.hasValue()) {
      return this.props.title;
    }
    return (
      <A
        ref={ref as RefObject<HTMLAnchorElement>}
        href={this.props.value || ''}
      >
        {this.props.title}
      </A>
    );
  };

  render() {
    return (
      <EditableString
        value={this.props.value}
        renderPrefix={this.renderBinaryIndicator}
        renderValue={this.renderValue}
        save={this.props.save}
      />
    );
  }
}

export default EditableLink;
