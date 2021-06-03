import { useContext } from 'react';

import { Button } from '~/frontkit';

import PrintContext from './PrintContext';

interface Props {
  setPageCount: (c: number) => void;
}

const PageCountEditor: React.FC<Props> = ({ setPageCount }) => {
  const printContext = useContext(PrintContext);

  const cb = () => {
    const n = window.prompt('Число страниц?');
    if (!n) {
      return;
    }
    setPageCount(parseInt(n) || 0);
  };

  return (
    <div className="print:hidden bg-highlight fixed right-2 top-2 p-2">
      <div>{printContext.page.count} страниц</div>
      <Button onClick={cb}>Настроить число страниц</Button>
    </div>
  );
};

export default PageCountEditor;
