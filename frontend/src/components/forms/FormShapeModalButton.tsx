import ButtonWithModal from '../ButtonWithModal';
import { FormShapeModal, Props as ModalProps } from './FormShapeModal';
import { FormShape } from './types';

export type Props<S extends FormShape> = Pick<
  ModalProps<S>,
  'shape' | 'defaultValues' | 'post'
> & {
  buttonLabel: string;
  modalSubmitLabel: string;
  modalTitle: string;
  size?: Parameters<typeof ButtonWithModal>[0]['size'];
};

export function FormShapeModalButton<S extends FormShape>(props: Props<S>) {
  return (
    <ButtonWithModal title={props.buttonLabel} size={props.size}>
      {({ close }) => (
        <FormShapeModal
          close={close}
          title={props.modalTitle}
          submitLabel={props.modalSubmitLabel}
          shape={props.shape}
          post={props.post}
          defaultValues={props.defaultValues}
        />
      )}
    </ButtonWithModal>
  );
}
