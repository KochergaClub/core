import { A, HR, Row } from '@kocherga/frontkit';

import { PaddedBlock } from '~/components';

import { FaqPageFragment } from '../fragments.generated';

interface Props {
  wagtailPage: FaqPageFragment;
}

const NavigationBlock: React.FC<Props> = ({ wagtailPage }) => {
  const prev = wagtailPage.prev_page;
  const next = wagtailPage.next_page;

  if (!prev && !next) {
    return null;
  }

  return (
    <PaddedBlock>
      <HR />
      <Row spaced>
        {prev ? (
          <A href={prev.meta.url}>&larr; {prev.title}</A>
        ) : (
          <span>&nbsp;</span>
        )}
        {next ? (
          <A href={next.meta.url}>{next.title} &rarr;</A>
        ) : (
          <span>&nbsp;</span>
        )}
      </Row>
    </PaddedBlock>
  );
};

export default NavigationBlock;
