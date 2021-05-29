import { useCallback, useRef } from 'react';
import { FaRegCopy } from 'react-icons/fa';
import styled from 'styled-components';

import { colors } from '~/frontkit';

const ClipboardIcon = styled(FaRegCopy)`
  color: ${colors.grey[400]};
  cursor: pointer;
  &:hover {
    color: ${colors.grey[600]};
  }
`;

interface Props {
  text: string;
}

const CopyToClipboardIcon: React.FC<Props> = ({ text }) => {
  const textRef = useRef<HTMLTextAreaElement>(null);
  const copy = useCallback(() => {
    if (!textRef.current) {
      return; // shouldn't happen
    }
    textRef.current.select();
    document.execCommand('copy');
  }, []);

  return (
    <>
      <textarea
        style={{ position: 'absolute', left: -10000, top: -10000 }}
        ref={textRef}
        value={text}
      />
      <ClipboardIcon onClick={copy} />
    </>
  );
};

export default CopyToClipboardIcon;
