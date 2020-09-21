import Head from 'next/head';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { Page } from '~/components';

import { TildaPageQuery } from '../queries.generated';
import { normalizeSsrPath } from '../utils';

type Props = TildaPageQuery['tildaPage'];

const Container = styled.div`
  box-sizing: content-box;
`;

const TildaPage: React.FC<Props> = (props) => {
  const router = useRouter();

  const canonicalUrl =
    process.env.NEXT_PUBLIC_KOCHERGA_WEBSITE + normalizeSsrPath(router.asPath);

  return (
    <>
      <Head>
        {props.css.map((asset) => (
          <link rel="stylesheet" href={asset.url} key={asset.url} />
        ))}
        {props.js.map((asset) => (
          <script src={asset.url} key={asset.url} />
        ))}
      </Head>
      <Page
        title={props.title}
        description={props.description}
        canonicalUrl={canonicalUrl}
        chrome={props.show_header_and_footer ? 'default' : 'none'}
        og={{ image: props.og_image?.url }}
        vkImage={props.vk_image?.url}
        noWhitespace
      >
        <Container dangerouslySetInnerHTML={{ __html: props.body }} />
      </Page>
    </>
  );
};

export default TildaPage;
