import RatioWagtailBlocks from '../../components/RatioWagtailBlocks';
import { RatioSectionPageFragment as Props } from '../fragments.generated';

export default function Main(props: Props) {
  return (
    <div>
      <h1 className="text-center">{props.title}</h1>
      <RatioWagtailBlocks blocks={props.body} />
    </div>
  );
}
