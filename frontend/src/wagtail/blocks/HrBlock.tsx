import { HR } from '@kocherga/frontkit';

import { PaddedBlock } from '~/components';

import { HrBlockFragment as Props } from './fragments.generated';

export default function HrBlock(block: Props) {
  return (
    <PaddedBlock>
      <HR />
    </PaddedBlock>
  );
}
