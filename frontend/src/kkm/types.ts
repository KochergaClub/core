import { KkmSignMethodCalculation } from '~/apollo/types.generated';

export const signMethodCalculationLabels: Record<
  KkmSignMethodCalculation,
  string
> = {
  [KkmSignMethodCalculation.PrePayment_100]: 'ПРЕДОПЛАТА 100%',
  [KkmSignMethodCalculation.PrePayment]: 'ПРЕДОПЛАТА',
  [KkmSignMethodCalculation.Advance]: 'АВАНС',
  [KkmSignMethodCalculation.FullPayment]: 'ПОЛНЫЙ РАСЧЕТ',
  [KkmSignMethodCalculation.PartialPaymentAndCredit]:
    'ЧАСТИЧНЫЙ РАСЧЕТ И КРЕДИТ',
  [KkmSignMethodCalculation.CreditTransfer]: 'ПЕРЕДАЧА В КРЕДИТ',
  [KkmSignMethodCalculation.CreditPayment]: 'ОПЛАТА КРЕДИТА',
};

export interface FormValues {
  email: string;
  title: string;
  amount: number;
  method: KkmSignMethodCalculation;
}
