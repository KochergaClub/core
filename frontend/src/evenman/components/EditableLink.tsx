import { RefObject } from 'react';

import { A } from '@kocherga/frontkit';

import BinaryIndicator from './BinaryIndicator';
import EditableString from './EditableString';

export interface Props {
  value: string | undefined;
  title: string;
  save: (value: string) => Promise<unknown>;
}

const EditableLink: React.FC<Props> = ({ value, title, save }) => {
  const hasValue = Boolean(value);

  const renderBinaryIndicator = () => {
    return <BinaryIndicator status={hasValue} />;
  };

  const renderValue = (ref?: RefObject<HTMLElement>) => {
    if (!hasValue) {
      return title;
    }
    return (
      <A ref={ref as RefObject<HTMLAnchorElement>} href={value || ''}>
        {title}
      </A>
    );
  };

  return (
    <EditableString
      value={value}
      renderPrefix={renderBinaryIndicator}
      renderValue={renderValue}
      save={save}
    />
  );
};

export default EditableLink;
