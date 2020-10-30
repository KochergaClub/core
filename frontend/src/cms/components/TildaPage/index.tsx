import Head from 'next/head';
import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import { Page } from '~/components';

import { TildaPageQuery } from '../../queries.generated';
import OrderModal from './OrderModal';

type Props = TildaPageQuery['tildaPage'];

const Container = styled.div`
  box-sizing: content-box;
`;

const TildaPage: React.FC<Props> = (props) => {
  const [ordering, setOrdering] = useState(false);

  const patchedBody = useMemo(
    () =>
      props.body.replace(
        /(<a\s+href="#kocherga_order: .*?")/g,
        '$1 data-kocherga="tilda-order-link"'
      ),
    [props.body]
  );

  useEffect(() => {
    const links = Array.from(
      document.querySelectorAll('a[data-kocherga="tilda-order-link"]')
    ) as HTMLLinkElement[];

    const listeners = links.map((link) => {
      const listener = (event: MouseEvent) => {
        event.preventDefault();
        setOrdering(true);
      };
      link.addEventListener('click', listener);
      return listener;
    });
    return () => {
      links.forEach((link, i) => {
        link.removeEventListener('click', listeners[i]);
      });
    };
  }, [patchedBody]);

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
        chrome={props.show_header_and_footer ? 'default' : 'none'}
        og={{ image: props.og_image?.url }}
        vkImage={props.vk_image?.url}
        noWhitespace
      >
        <Container dangerouslySetInnerHTML={{ __html: patchedBody }} />
        {ordering ? (
          <OrderModal
            close={() => {
              setOrdering(false);
            }}
          />
        ) : null}
      </Page>
    </>
  );
};

export default TildaPage;
