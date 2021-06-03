import { Page } from '~/components';
import { NextWagtailPage } from '~/wagtail/types';

import { RatioNotebookPageFragment, RatioNotebookPageFragmentDoc } from '../fragments.generated';
import RatioSection_Main from '../SectionPage/Main';
import Emptypage from './Emptypage';
import Frontpage from './Frontpage';
import { PrintDocument } from './PrintDocument';
import PrintFooter from './PrintFooter';
import SectionTOC from './SectionTOC';
import styles from './styles.module.scss';

const NotebookPage: NextWagtailPage<RatioNotebookPageFragment> = ({ page }) => {
  const footer = <PrintFooter />;
  return (
    <Page title={page.title} chrome="none" menu="team">
      <PrintDocument footer={footer}>
        <Frontpage wagtailPage={page} />
        <Emptypage />
        <SectionTOC page={page} />
        <Emptypage />
        <div>
          {page.sections.map((section) => {
            return (
              <section className={styles['break-before-page']} key={section.id}>
                <a id={`section-${section.value.meta.slug}`} />
                <RatioSection_Main {...section.value} />
              </section>
            );
          })}
        </div>
      </PrintDocument>
    </Page>
  );
};

NotebookPage.fragment = RatioNotebookPageFragmentDoc;

export default NotebookPage;
