import ButtonWithModal from '../ButtonWithModal';
import ModalForm from './ModalForm';
import { AnyFormValues, FormShape, PostResult } from './types';

interface Props<Values extends AnyFormValues> {
  shape: FormShape; // FormShape should match Values!
  initialValues?: Values; // used for editing existing data; if initialValues is set then shape.*.default is ignored
  buttonName: string;
  modalButtonName: string;
  modalTitle: string;
  size?: Parameters<typeof ButtonWithModal>[0]['size'];
  post: (values: Values) => Promise<PostResult<Values> | void>;
}

function ModalFormButton<Values extends AnyFormValues>(props: Props<Values>) {
  return (
    <ButtonWithModal title={props.buttonName} size={props.size}>
      {({ close }) => <ModalForm {...props} close={close} />}
    </ButtonWithModal>
  );
}

export default ModalFormButton;
