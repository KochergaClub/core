import { FaExternalLinkAlt } from 'react-icons/fa';
import styled from 'styled-components';

const ExternalLink = styled.a`
  position: absolute;
  right: 5px;
  top: 5px;
  color: white;
`;

interface Props {
  link: string;
}

const ViewOverlay: React.FC<Props> = ({ link }) => (
  <ExternalLink href={link} target="_blank">
    <FaExternalLinkAlt />
  </ExternalLink>
);

export default ViewOverlay;
