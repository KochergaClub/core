import clsx from 'clsx';

import { RatioNotebookPageFragment } from '../fragments.generated';
import styles from './styles.module.css';

export default function SectionTOC(props: { page: RatioNotebookPageFragment }) {
  return (
    <div
      className={clsx(
        'mx-auto max-w-3xl min-h-80 print:min-h-0',
        styles['break-after-page']
      )}
    >
      {props.page.sections.map((section) => {
        const sectionPage = section.value;
        return (
          <a
            className="block text-black no-underline border-b border-gray-400 uppercase mb-3"
            key={sectionPage.id}
            href={`#section-${sectionPage.meta.slug}`}
          >
            {sectionPage.title}
          </a>
        );
      })}
    </div>
  );
}
