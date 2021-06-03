import clsx from 'clsx';
import { useContext } from 'react';

import PrintContext from './PrintContext';

// this is actually a header
export default function PrintFooter() {
  const printContext = useContext(PrintContext);

  return (
    <div className="hidden print:block">
      {Array.from(new Array(printContext.page.count)).map((_, i) => {
        const pageNumber = i + 1;
        const pageHeight =
          printContext.page.height - printContext.page.bottomMargin;
        const pageTop = pageHeight * (pageNumber - 1);
        const top = pageTop + pageHeight - 8;
        if (pageNumber <= 4) {
          return null;
        }
        return (
          <footer
            key={pageNumber}
            className={clsx(
              'absolute w-full text-gray-400',
              pageNumber % 2 ? 'text-right' : 'text-left'
            )}
            style={{
              top: `${top}mm`,
              paddingLeft: '10mm',
              paddingRight: '10mm',
            }}
          >
            {pageNumber}
          </footer>
        );
      })}
    </div>
  );
}
