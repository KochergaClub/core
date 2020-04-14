import { Row } from '@kocherga/frontkit';

import EditableLink, {
  Props as EditableLinkProps,
} from '../../components/EditableLink';

const EditableOrElement = (
  props: { el: React.ReactNode } & EditableLinkProps
) => {
  const { el, ...editableProps } = props;

  return (
    <Row>
      <EditableLink {...props} />
      &nbsp;{editableProps.value ? null : el}
    </Row>
  );
};

export default EditableOrElement;
