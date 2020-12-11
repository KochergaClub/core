import React, { useEffect, useState } from 'react';

import { Modal } from '~/frontkit';
import { confirmOrderRoute } from '~/ratio/routes';

import { RatioOrder_CreatedFragment } from './queries.generated';

// inspired by https://medium.com/better-programming/loading-third-party-scripts-dynamically-in-reactjs-458c41a7013d
const loadKassaCheckoutUI = () => {
  return new Promise((resolve, reject) => {
    const id = 'kassaCheckoutUI';
    const existingScript = document.getElementById(id);
    if (existingScript) {
      resolve();
    } else {
      const script = document.createElement('script');
      script.src = 'https://kassa.yandex.ru/checkout-ui/v2.js';
      script.id = id;
      document.body.appendChild(script);
      script.onload = () => {
        resolve();
      };
      script.onerror = (e: Event | string) => {
        reject(e);
      };
    }
  });
};

interface CheckoutProps {
  close: () => void;
  order: RatioOrder_CreatedFragment;
}

const CheckoutOrderModal: React.FC<CheckoutProps> = ({ close, order }) => {
  const [failed, setFailed] = useState('');
  useEffect(() => {
    (async () => {
      try {
        await loadKassaCheckoutUI();
      } catch (e) {
        setFailed('Не удалось загрузить виджет платёжной системы');
        return;
      }
      const return_url = `${
        process.env.NEXT_PUBLIC_KOCHERGA_WEBSITE
      }${confirmOrderRoute(order.id)}`;

      const checkout = new (window as any).YandexCheckout({
        confirmation_token: order.confirmation_token, // Токен, который перед проведением оплаты нужно получить от Яндекс.Кассы
        return_url,
        error_callback(error: any) {
          // Обработка ошибок инициализации
          // TODO
        },
      });
      checkout.render('kassa-checkout-form');
    })();
  }, [order.id, order.confirmation_token]);

  return (
    <Modal>
      <Modal.Header close={close}>Регистрация</Modal.Header>
      <Modal.Body>
        <div id="kassa-checkout-form"></div>
        {failed ? <div>{failed}</div> : null}
      </Modal.Body>
    </Modal>
  );
};

export default CheckoutOrderModal;
