import React from 'react';

import { useCommonHotkeys } from '~/common/hooks';
import { ErrorMessage } from '~/components/forms2';
import { Button, ControlsFooter, Modal, Row } from '~/frontkit';

interface Props {
  title: string;
  close: () => void;
  submit: () => Promise<unknown>;
  buttonText?: string;
  submitError?: string;
  loading?: boolean;
  disabled?: boolean;
}

export const CommonModal: React.FC<Props> = ({
  title,
  close,
  submit,
  buttonText = 'Сохранить',
  submitError,
  loading,
  disabled,
  children,
}) => {
  const hotkeys = useCommonHotkeys({
    onEnter: submit,
    onEscape: close,
  });

  return (
    <Modal>
      <Modal.Header close={close}>{title}</Modal.Header>
      <Modal.Body {...hotkeys}>{children}</Modal.Body>
      <Modal.Footer>
        <ControlsFooter>
          <Row vCentered gutter={16}>
            {submitError && <ErrorMessage>{submitError}</ErrorMessage>}
            <Button
              type="submit"
              kind="primary"
              loading={loading}
              disabled={loading || disabled}
              onClick={submit}
            >
              {buttonText}
            </Button>
          </Row>
        </ControlsFooter>
      </Modal.Footer>
    </Modal>
  );
};
