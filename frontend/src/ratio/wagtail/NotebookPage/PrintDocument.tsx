import '../../fonts.css';

import { useState } from 'react';

import PageCountEditor from './PageCountEditor';
import PrintContext from './PrintContext';
import styles from './styles.module.css';

interface Props {
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export const PrintDocument: React.FC<Props> = (props) => {
  const [pageCount, setPageCount] = useState(100);

  const printContext = {
    page: {
      count: pageCount,
      height: 297,
      bottomMargin: 25.4,
    },
  };

  return (
    <PrintContext.Provider value={printContext}>
      <div className="bg-gray-300">
        <PageCountEditor setPageCount={setPageCount} />
        {props.footer || null}
        <table className={styles.container}>
          <thead>
            {/* thead is needed for tfoot to work, see https://stackoverflow.com/a/43942456 */}
            {/* TODO - figure out why tfoot doesn't work - https://bugs.chromium.org/p/chromium/issues/attachmentText?aid=379985 works */}
            <tr>
              <th>
                <div className={styles['header-placeholder']} />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div>{props.children}</div>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th />
            </tr>
          </tfoot>
        </table>
      </div>
    </PrintContext.Provider>
  );
};
