import ButtonWithModal from '../ButtonWithModal';
import ModalForm from './ModalForm';
import { AnyFormValues, FormShape, PostResult } from './types';

interface Props<Values extends AnyFormValues> {
  shape: FormShape; // FormShape should match Values!
  initialValues?: Values; // used for editing existing data; if initialValues is set then shape.*.default is ignored
  buttonName: string;
  modalButtonName: string;
  modalTitle: string;
  small?: boolean;
  post: (values: Values) => Promise<PostResult | void>;
}

function ModalFormButton<Values extends AnyFormValues>(props: Props<Values>) {
  return (
    <ButtonWithModal title={props.buttonName} small={props.small}>
      {({ close }) => <ModalForm {...props} close={close} />}
    </ButtonWithModal>
  );
}

export default ModalFormButton;
