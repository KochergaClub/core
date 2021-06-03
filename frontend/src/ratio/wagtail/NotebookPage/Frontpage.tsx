import clsx from 'clsx';
import { useContext } from 'react';

import { staticUrl } from '~/common/utils';

import { RatioNotebookPageFragment } from '../fragments.generated';
import PrintContext from './PrintContext';
import styles from './styles.module.scss';

interface Props {
  wagtailPage: RatioNotebookPageFragment;
}

export default function Frontpage(props: Props) {
  const printContext = useContext(PrintContext);
  return (
    <div
      className={clsx(
        'flex flex-col h-screen print:h-auto border-b border-gray-200 print:border-0 mb-5 print:mb-0',
        styles['break-after-page']
      )}
      style={{
        height: `${
          printContext.page.height - printContext.page.bottomMargin * 2 - 10
        }mm`,
      }}
    >
      <div className="flex-1 flex justify-center items-center">
        <div className={styles['frontpage-header']}>
          {props.wagtailPage.title}
        </div>
      </div>
      <footer className="w-full">
        {/* TODO - add event date line, or maybe picker of a ratio event */}
        {false && (
          <div className="text-center text-gray-500 mb-3">
            Выездной воркшоп по рациональности
          </div>
        )}

        <div className="flex justify-center items-center mb-3">
          <img className="h-8 mr-2" src={staticUrl('logo.png')} />
          <div style={{ fontFamily: 'Intro' }}>Кочерга</div>
        </div>
      </footer>
    </div>
  );
}
