import Head from 'next/head';
import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import { Page } from '~/components';

import { TildaPageQuery } from '../../queries.generated';
import OrderModal, { OrderParams } from './OrderModal';

type Props = TildaPageQuery['tildaPage'];

const Container = styled.div`
  box-sizing: content-box;
`;

const TildaPage: React.FC<Props> = (props) => {
  // will show order modal if orderParams is set
  const [orderParams, setOrderParams] = useState<OrderParams | undefined>(
    undefined
  );

  const patchedBody = useMemo(
    () =>
      props.body.replace(
        /(<a\s+href="#kocherga_order(?::(.*?))")/g,
        (match, p1: string, p2: string) => {
          let result = p1 + ' data-kocherga="tilda-order-link"';
          if (p2) {
            result += ' data-kocherga-order-params="' + p2 + '"';
          }
          return result;
        }
      ),
    [props.body]
  );

  useEffect(() => {
    const links = Array.from(
      document.querySelectorAll('a[data-kocherga="tilda-order-link"]')
    ) as HTMLLinkElement[];

    const listeners = links.map((link) => {
      const linkOrderParams: OrderParams = {};
      const paramsString = link.getAttribute('data-kocherga-order-params');
      if (paramsString) {
        const pairs = paramsString.split(',');
        for (const pair of pairs) {
          const [key, value] = pair.split('=');
          if (key === 'ticket_type') {
            linkOrderParams.ticketTypeId = value;
          }
          if (key === 'training_type') {
            linkOrderParams.trainingType = value;
          }
          if (key === 'name_fields') {
            linkOrderParams.showNameFields = value === '1';
          }
          if (key === 'city_field') {
            linkOrderParams.showCityField = value === '1';
          }
          if (key === 'promocode_field') {
            linkOrderParams.showPromocodeField = value === '1';
          }
        }
      }
      const listener = (event: MouseEvent) => {
        event.preventDefault();
        setOrderParams(linkOrderParams);
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
        {orderParams ? (
          <OrderModal
            {...orderParams}
            close={() => {
              setOrderParams(undefined);
            }}
          />
        ) : null}
      </Page>
    </>
  );
};

export default TildaPage;
