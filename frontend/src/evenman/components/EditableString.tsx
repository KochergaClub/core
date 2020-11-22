import { RefObject, useCallback, useRef, useState } from 'react';
import { FaEdit, FaSpinner } from 'react-icons/fa';
import styled from 'styled-components';

import { Input } from '~/frontkit';

import { IconLink } from './ui';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  > * + * {
    margin-left: 4px;
  }
`;

type Props = {
  value: string | undefined;
  save: (value: string) => Promise<unknown>;
  renderPrefix?: () => React.ReactNode;
  renderValue: (ref: RefObject<HTMLElement>) => React.ReactNode;
};

export const EditableString: React.FC<Props> = ({
  value,
  save,
  renderPrefix,
  renderValue,
}) => {
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);

  const input = useRef<HTMLInputElement | null>();
  const setInput = useCallback((node: HTMLInputElement) => {
    if (node) {
      node.focus();
      node.select();
    }
    input.current = node;
  }, []);

  const valueRef = useRef<HTMLElement>(null);

  const saved = useCallback(() => {
    setSaving(false);
    setEditing(false);
  }, []);

  const startEditing = useCallback(() => {
    setEditing(true);
  }, []);

  const stopEditing = useCallback(() => {
    setEditing(false);
  }, []);

  const submit = useCallback(async () => {
    if (!input.current) {
      return;
    }
    const newValue = input.current.value;
    if (newValue === value) {
      // no need for saving
      stopEditing();
      return;
    }
    setSaving(true);
    await save(input.current.value);
    saved();
  }, [value, save, saved, stopEditing]);

  const keypress = async (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.keyCode === 13) {
      await submit();
    } else if (e.keyCode === 27) {
      stopEditing();
    }
  };

  const renderInput = () => {
    let width = undefined;
    if (valueRef.current) {
      width = valueRef.current.offsetWidth + 16;
    }
    if (width && width < 40) {
      width = 40;
    }

    return (
      <Input
        type="text"
        ref={setInput}
        disabled={saving}
        defaultValue={value}
        onKeyDown={keypress}
        style={{
          width,
          minWidth: 100,
        }}
      />
    );
  };

  const renderValueOrInput = () => {
    if (editing) {
      return renderInput();
    }
    return renderValue(valueRef);
  };

  const renderEditIcon = () => {
    if (saving) {
      return <FaSpinner />;
    }
    return (
      <IconLink
        href=""
        onClick={(e) => {
          e.preventDefault();
          startEditing();
        }}
      >
        <FaEdit />
      </IconLink>
    );
  };

  return (
    <Container>
      {renderPrefix && renderPrefix()}
      <div>{renderValueOrInput()}</div>
      {renderEditIcon()}
    </Container>
  );
};
