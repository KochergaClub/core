import ButtonWithModal from '../ButtonWithModal';
import { FormShape } from '../forms/types';
import { FormShapeModal, Props as ModalProps } from './FormShapeModal';

type Props<S extends FormShape> = Pick<
  ModalProps<S>,
  'shape' | 'defaultValues' | 'post'
> & {
  buttonName: string;
  modalButtonName: string;
  modalTitle: string;
  size?: Parameters<typeof ButtonWithModal>[0]['size'];
};

export function FormShapeModalButton<S extends FormShape>(props: Props<S>) {
  return (
    <ButtonWithModal title={props.buttonName} size={props.size}>
      {({ close }) => (
        <FormShapeModal
          close={close}
          title={props.modalTitle}
          buttonText={props.modalButtonName}
          shape={props.shape}
          post={props.post}
          defaultValues={props.defaultValues}
        />
      )}
    </ButtonWithModal>
  );
}
