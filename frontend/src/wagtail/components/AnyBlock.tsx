import { allBlockComponents, isKnownBlock } from '../blocks';
import { AnyBlockFragment } from '../types';
import DebugBlock from './DebugBlock';

// TODO - move type helpers to blocks/index.tsx?
type ComponentsMap = typeof allBlockComponents;
type KnownTypename = keyof ComponentsMap;

type TypenameToFragment<T extends KnownTypename> = Parameters<
  ComponentsMap[T]
>[0];

const renderKnownBlock = <T extends KnownTypename>(
  block: TypenameToFragment<T>
): JSX.Element => {
  const BlockComponent = allBlockComponents[block.__typename];
  return <BlockComponent {...(block as any)} />; // Almost there... sorry. I'll figure this out later.
};

const AnyBlock = (block: AnyBlockFragment) => {
  if (isKnownBlock(block)) {
    return renderKnownBlock(block);
  }
  return <DebugBlock typename={block.__typename || 'UNKNOWN'} />;
};

export default AnyBlock;
