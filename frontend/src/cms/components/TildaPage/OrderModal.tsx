import React, { useCallback, useEffect, useState } from 'react';

import { Modal } from '@kocherga/frontkit';

import ModalForm from '~/components/forms/ModalForm';
import { FormShape } from '~/components/forms/types';

interface Props {
  close: () => void;
}

interface Values {
  training: string;
  email: string;
  name: string;
  recipientName: string;
  recipientEmail: string;
  city: string;
}
const shape: FormShape = [
  {
    type: 'choice',
    name: 'training',
    title: 'В каком потоке вы участвуете?',
    options: [
      ['ratio-online-10', '10 октября 2020 – 14 ноября 2020'],
      ['ratio-online-11', '14 ноября 2020 – 19 ноября 2020'],
    ],
  },
  {
    type: 'email',
    name: 'email',
    title: 'Ваш e-mail',
  },
  {
    type: 'string',
    name: 'name',
    title: 'Ваши полные, настоящие имя и фамилия',
  },
  {
    type: 'string',
    name: 'recipientName',
    title: 'Полные, настоящие имя и фамилия участвующего в курсе',
    optional: true,
  },
  {
    type: 'email',
    name: 'recipientEmail',
    title: 'E-mail получающего',
    optional: true,
  },
  {
    type: 'string',
    name: 'city',
    title: 'Из какого города вы планируете проходить курс?',
  },
];

// inspired by https://medium.com/better-programming/loading-third-party-scripts-dynamically-in-reactjs-458c41a7013d
const loadKassaCheckoutUI = (cb: () => void) => {
  const id = 'kassaCheckoutUI';
  const existingScript = document.getElementById(id);
  if (!existingScript) {
    const script = document.createElement('script');
    script.src = 'https://kassa.yandex.ru/checkout-ui/v2.js';
    script.id = id;
    document.body.appendChild(script);
    script.onload = () => {
      if (cb) {
        cb();
      }
    };
  }
  if (existingScript && cb) cb();
};

interface CheckoutProps {
  close: () => void;
  title: string;
}

const CheckoutModal: React.FC<CheckoutProps> = ({ close, title }) => {
  useEffect(() => {
    loadKassaCheckoutUI(() => {
      const checkout = new (window as any).YandexCheckout({
        confirmation_token: 'confirmation-token', //Токен, который перед проведением оплаты нужно получить от Яндекс.Кассы
        return_url: 'https://kocherga-club.ru', // TODO
        error_callback(error: any) {
          //Обработка ошибок инициализации
          // TODO
        },
      });
      checkout.render('kassa-checkout-form');
    });
  }, []);
  return (
    <Modal>
      <Modal.Header toggle={close}>{title}</Modal.Header>
      <Modal.Body>
        <div id="kassa-checkout-form"></div>
      </Modal.Body>
    </Modal>
  );
};

const OrderModal: React.FC<Props> = ({ close }) => {
  const [step, setStep] = useState<'form' | 'checkout'>('form');

  const postForm = useCallback(async (v: Values) => {
    setStep('checkout');
    return { close: false };
  }, []);

  const title = 'Регистрация на участие в онлайн-курсе «Рациональность в деле»';

  switch (step) {
    case 'form':
      return (
        <ModalForm
          modalTitle={title}
          shape={shape}
          modalButtonName="Оплатить"
          post={postForm}
          close={close}
        />
      );
    case 'checkout':
      return <CheckoutModal close={close} title={title} />;
  }
};

export default OrderModal;
