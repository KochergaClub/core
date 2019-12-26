import * as React from 'react';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';

import { Input } from '@kocherga/frontkit';

import { FaEdit, FaSpinner } from 'react-icons/fa';

import { IconLink } from './ui';

export interface Props {
  value: string | undefined;
  save: (value: string) => void;
  renderPrefix?: () => React.ReactNode;
  renderValue: (ref: (instance: HTMLElement | null) => void) => React.ReactNode;
}

@observer
class EditableString extends React.Component<Props, {}> {
  @observable saving = false;
  @observable editing = false;

  private input: HTMLInputElement | null = null;
  private valueRef: HTMLElement | null = null;

  componentWillReceiveProps(nextProps: Props) {
    if (
      this.saving &&
      (nextProps.value === this.input!.value ||
        (nextProps.value === undefined && this.input!.value === ''))
      // weird case - when we save an empty string, the server responds with 'undefined'
    ) {
      this.saved();
    }
  }

  componentDidUpdate() {
    if (this.editing) {
      this.input!.focus();
      this.input!.select();
    }
  }

  keypress(e: React.KeyboardEvent<HTMLElement>) {
    if (e.keyCode === 13) {
      this.save();
    } else if (e.keyCode === 27) {
      this.stopEditing();
    }
  }

  @action
  save() {
    const newValue = this.input!.value;
    if (newValue === this.props.value) {
      // no need for saving
      this.stopEditing();
      return;
    }
    this.props.save(this.input!.value);
    this.saving = true;
  }

  @action
  saved() {
    this.saving = false;
    this.editing = false;
  }

  @action
  startEditing() {
    this.editing = true;
  }

  @action
  stopEditing() {
    this.editing = false;
  }

  renderInput() {
    let width = undefined;
    if (this.valueRef) {
      width = this.valueRef.offsetWidth + 16;
    }
    if (width && width < 40) {
      width = 40;
    }

    return (
      <Input
        type="text"
        ref={ref => (this.input = ref)}
        disabled={this.saving}
        defaultValue={this.props.value}
        onKeyDown={e => this.keypress(e)}
        style={{
          width,
          minWidth: 100,
        }}
      />
    );
  }

  renderValueOrInput = () => {
    if (this.editing) {
      return this.renderInput();
    }
    return this.props.renderValue(ref => {
      this.valueRef = ref;
    });
  };

  renderEditIcon() {
    if (this.saving) {
      return <FaSpinner />;
    }
    return (
      <IconLink
        href="#"
        onClick={e => {
          e.preventDefault();
          this.startEditing();
        }}
      >
        <FaEdit />
      </IconLink>
    );
  }

  renderPrefix() {
    if (!this.props.renderPrefix) return;
    return this.props.renderPrefix();
  }

  render() {
    return (
      <div>
        {this.renderPrefix()} {this.renderValueOrInput()}{' '}
        {this.renderEditIcon()}
      </div>
    );
  }
}

export default EditableString;
