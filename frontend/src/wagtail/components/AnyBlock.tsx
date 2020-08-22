import { allBlockComponents } from '../blocks';
import { AnyBlockFragment } from '../types';
import DebugBlock from './DebugBlock';

type ComponentsMap = typeof allBlockComponents;

type KnownTypename = keyof ComponentsMap;

type TypenameToFragment<T extends KnownTypename> = Parameters<
  ComponentsMap[T]
>[0];

type KnownBlockFragment = Parameters<ComponentsMap[keyof ComponentsMap]>[0];

const isKnownFragment = (
  block: AnyBlockFragment
): block is KnownBlockFragment => {
  return allBlockComponents.hasOwnProperty(block.__typename);
};

const renderKnownBlock = <T extends KnownTypename>(
  block: TypenameToFragment<T>
): JSX.Element => {
  const BlockComponent = allBlockComponents[block.__typename];
  return <BlockComponent {...(block as any)} />; // Almost there... sorry. I'll figure this out later.
};

const AnyBlock = (block: AnyBlockFragment) => {
  if (isKnownFragment(block)) {
    return renderKnownBlock(block);
  }
  return <DebugBlock typename={block.__typename || 'UNKNOWN'} />;
};

export default AnyBlock;
