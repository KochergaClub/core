import { ButtonWithModal } from '../';
import { MutationModal, Props as MutationModalProps } from './MutationModal';
import { FormShape, ShapeToValues } from './types';

type PropsForModal<S extends FormShape, Variables> = Omit<
  MutationModalProps<S, Variables>,
  'close' | 'title' | 'submitLabel'
>;

type Props<S extends FormShape, Variables> = PropsForModal<S, Variables> & {
  buttonLabel: string;
  modalSubmitLabel: string;
  modalTitle: string;
  size?: Parameters<typeof ButtonWithModal>[0]['size'];
};

export function MutationModalButton<
  S extends FormShape,
  Variables = { input: ShapeToValues<S> }
>({
  buttonLabel,
  modalTitle,
  modalSubmitLabel,
  size,
  ...otherProps
}: Props<S, Variables>) {
  return (
    <ButtonWithModal title={buttonLabel} size={size}>
      {({ close }) => (
        <MutationModal
          close={close}
          title={modalTitle}
          submitLabel={modalSubmitLabel}
          {
            /* MutationModal is tricky to type, see comments in its implementation */
            ...((otherProps as PropsForModal<S, Variables>) as any)
          }
        />
      )}
    </ButtonWithModal>
  );
}
