import { useMemo } from 'react';
import styled from 'styled-components';

import { useRouter } from 'next/router';
import Head from 'next/head';

import { Page } from '~/components';

import { TildaPageQuery } from '../queries.generated';
import { normalizeSsrUrl } from '../utils';

type Props = TildaPageQuery['tildaPage'];

const Container = styled.div`
  box-sizing: content-box;
`;

const TildaPage: React.FC<Props> = props => {
  const router = useRouter();

  const patchedBody = useMemo(() => {
    return props.body.replace(
      /<!--(header|footer)-->(.|\n|\r)*<!--\/\1-->/g,
      ''
    );
  }, [props.body]);

  const canonicalUrl = normalizeSsrUrl(router.asPath);

  return (
    <>
      <Head>
        {props.css.map(asset => (
          <link rel="stylesheet" href={asset.url} key={asset.url} />
        ))}
        {props.js.map(asset => (
          <script src={asset.url} key={asset.url} />
        ))}
      </Head>
      <Page
        title={props.title}
        canonicalUrl={canonicalUrl}
        chrome={props.show_header_and_footer ? 'default' : 'none'}
      >
        <Container dangerouslySetInnerHTML={{ __html: patchedBody }} />
      </Page>
    </>
  );
};

export default TildaPage;
