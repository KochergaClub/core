import { createContext } from 'react';

interface PrintContextShape {
  page: {
    height: number;
    bottomMargin: number;
    count: number;
  };
}

const PrintContext = createContext<PrintContextShape>({
  page: {
    height: 297,
    bottomMargin: 25.4,
    count: 100,
  },
});

export default PrintContext;
