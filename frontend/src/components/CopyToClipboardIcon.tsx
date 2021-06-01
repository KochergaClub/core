import { useCallback, useRef } from 'react';
import { FaRegCopy } from 'react-icons/fa';

interface Props {
  text: string;
}

export const CopyToClipboardIcon: React.FC<Props> = ({ text }) => {
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
      <FaRegCopy
        className="text-gray-400 hover:text-gray-600 cursor-pointer"
        onClick={copy}
      />
    </>
  );
};
