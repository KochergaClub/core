import { FaCircle } from 'react-icons/fa';

const BinaryIndicator = ({ status }: { status: boolean }) => {
  const color = status ? '#19AB27' : '#f33';
  return <FaCircle color={color} />;
};

export default BinaryIndicator;
