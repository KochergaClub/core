import { FaExternalLinkAlt } from 'react-icons/fa';

interface Props {
  link: string;
}

const ViewOverlay: React.FC<Props> = ({ link }) => (
  <a
    className="absolute top-1.5 right-1.5 text-white"
    href={link}
    target="_blank"
  >
    <FaExternalLinkAlt />
  </a>
);

export default ViewOverlay;
