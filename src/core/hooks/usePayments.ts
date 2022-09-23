import { Payment, PaymentService } from 'goodvandro-alganews-sdk';
import { useCallback, useState } from 'react';

export default function usePayments() {
  const [fetchingPayments, setFetchingPayments] = useState(false);
  const [payments, setPayments] = useState<Payment.Paginated>();

  const [approvingPaymentBatch, setApprovingPaymentBatch] = useState(false);

  const approvePaymentBatch = useCallback(async (paymentIds: number[]) => {
    try {
      setApprovingPaymentBatch(true);
      await PaymentService.approvePaymentsBatch(paymentIds);
    } finally {
      setApprovingPaymentBatch(false);
    }
  }, []);

  const fetchPayments = useCallback(async (query: Payment.Query) => {
    try {
      setFetchingPayments(true);
      const payments = await PaymentService.getAllPayments(query);
      setPayments(payments);
    } finally {
      setFetchingPayments(false);
    }
  }, []);

  return {
    payments,
    fetchPayments,
    fetchingPayments,
    approvingPaymentBatch,
    approvePaymentBatch,
  };
}
