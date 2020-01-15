import styled from 'styled-components';

import { RatioSectionPageFragment as Props } from '../fragments.generated';

import RatioWagtailBlocks from '../../components/RatioWagtailBlocks';

const Header = styled.h1`
  text-align: center;
`;

export default function Main(props: Props) {
  return (
    <div>
      <Header>{props.title}</Header>
      <RatioWagtailBlocks blocks={props.body} />
    </div>
  );
}
