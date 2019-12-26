import React from 'react';

import { action, observable } from 'mobx';
import { observer } from 'mobx-react';

import breaks from 'remark-breaks';
import Markdown from 'react-markdown';
import autosize from 'autosize';

import { FaEdit } from 'react-icons/fa';

import styled from 'styled-components';

import { Button, ControlsFooter } from '@kocherga/frontkit';
import { Header, IconLink, UserText } from './ui';

const Textarea = styled.textarea`
  width: 100%;
  background-color: #ffffdd;
`;

interface Props {
  title: string;
  text: string;
  save: (text: string) => void;
  empty: React.ReactNode;
}

@observer
export default class EditableText extends React.Component<Props, {}> {
  @observable editing = false;

  @observable textarea?: HTMLTextAreaElement;

  @action.bound
  startEditing() {
    this.editing = true;
  }

  @action.bound
  cancelEditing() {
    this.editing = false;
  }

  @action.bound
  commitEditing() {
    this.editing = false;
    this.props.save(this.textarea!.value);
  }

  editText(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.keyCode === 27) {
      this.cancelEditing();
      return;
    }
    if (e.keyCode === 13 && (e.metaKey || e.ctrlKey)) {
      this.commitEditing();
      return;
    }
  }

  @action.bound
  setTextarea(el?: HTMLTextAreaElement) {
    if (el && this.textarea !== el) {
      autosize(el);
    }
    this.textarea = el;
  }

  componentDidUpdate() {
    if (this.textarea) {
      if (document.activeElement !== this.textarea) {
        this.textarea.focus();
      }
    }
  }

  renderEditing() {
    return (
      <div>
        <Textarea
          ref={el => this.setTextarea(el || undefined)}
          onKeyDown={e => this.editText(e)}
          defaultValue={this.props.text}
        />
        <ControlsFooter>
          <Button small onClick={this.cancelEditing}>
            Отменить
          </Button>
          <Button small primary onClick={this.commitEditing}>
            Сохранить
          </Button>
        </ControlsFooter>
      </div>
    );
  }

  renderPreview() {
    if (this.props.text) {
      return (
        <UserText>
          <Markdown source={this.props.text} plugins={[breaks]} />
        </UserText>
      );
    } else {
      return (
        <React.Fragment>
          {this.props.empty}
          <Button small onClick={this.startEditing}>
            добавить описание
          </Button>
        </React.Fragment>
      );
    }
  }

  render() {
    return (
      <section>
        <Header>
          {this.props.title}{' '}
          <IconLink
            href="#"
            onClick={(e: React.SyntheticEvent<EventTarget>) => {
              e.preventDefault();
              this.startEditing();
            }}
          >
            <FaEdit />
          </IconLink>
        </Header>
        {this.editing ? this.renderEditing() : this.renderPreview()}
      </section>
    );
  }
}
