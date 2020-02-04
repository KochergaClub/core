import { useState } from 'react';

import styled from 'styled-components';

import { staticUrl } from '~/common/utils';

import PrintContext from './PrintContext';
import PageCountEditor from './PageCountEditor';

interface Props {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

const Background = styled.div`
  background-color: #eee;
`;

// Table is needed for footer which doesn't overlap with the content
// See: https://medium.com/@Idan_Co/the-ultimate-print-html-template-with-header-footer-568f415f6d2a

const Container = styled.table`
  max-width: 800px;
  margin: 0 auto;
  background-color: white;
  @media screen {
    max-width: 840px;
    padding: 0 20px;
  }

  @font-face {
    font-family: 'Intro Book';
    src: url('${staticUrl('fonts/intro-pack/Intro-Book.otf')}');
    font-weight: normal;
  }
  @font-face {
    font-family: 'Intro Book';
    src: url('${staticUrl('fonts/intro-pack/Intro-Bold.otf')}');
    font-weight: bold;
  }
  font-family: 'Intro Book';

  @media print {
    font-size: 0.9em;
    thead {
      display: table-header-group;
    }
    tfoot {
      display: table-footer-group;
    }

    padding: 0 25.4mm;
  }

  @page {
    size: A4;
    margin-top: 0;
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 25.4mm;
  }
`;

const HeaderPlaceholder = styled.div`
  height: 25.4mm;
`;

export default function PrintDocument(props: Props) {
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
      <Background>
        <PageCountEditor setPageCount={setPageCount} />
        {props.footer || null}
        <Container>
          <thead>
            {/* thead is needed for tfoot to work, see https://stackoverflow.com/a/43942456 */}
            {/* TODO - figure out why tfoot doesn't work - https://bugs.chromium.org/p/chromium/issues/attachmentText?aid=379985 works */}
            <tr>
              <th>
                <HeaderPlaceholder />
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
        </Container>
      </Background>
    </PrintContext.Provider>
  );
}
