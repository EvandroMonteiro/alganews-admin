import { Card, Divider } from 'antd';
import moment from 'moment';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import usePayment from '../../core/hooks/usePayment';
import NotFoundError from '../components/NotFoundError';
import PaymentBonuses from '../features/PaymentBonuses';
import PaymentHeader from '../features/PaymentHeader';
import PaymentPosts from '../features/PaymentPosts';

export default function PaymentDetailsView() {
  const params = useParams<{ id: string }>();
  const navegate = useNavigate();

  const {
    fetchPayment,
    fetchPosts,
    fetchingPayment,
    fetchingPosts,
    postsNotFound,
    paymentNotFound,
    payment,
    posts,
  } = usePayment();

  useEffect(() => {
    const paymentId = Number(params.id);
    if (isNaN(paymentId)) {
      return navegate('/payments');
    } else {
      fetchPosts(paymentId);
      fetchPayment(paymentId);
    }
  }, [fetchPosts, fetchPayment, params.id, navegate]);

  if (paymentNotFound)
    return (
      <NotFoundError
        title='Pagamento não encontrado'
        actionDestination='/payments'
        actionTitle={'Ir para a lista de pagamentos'}
      />
    );

  return (
    <>
      <Card>
        <PaymentHeader
          loading={fetchingPayment}
          editorId={payment?.payee.id}
          editorName={payment?.payee.name}
          periodStart={moment(payment?.accountingPeriod.startsOn).format(
            'DD/MM/YYYY'
          )}
          periodEnd={moment(payment?.accountingPeriod.endsOn).format(
            'DD/MM/YYYY'
          )}
          postsEarnings={payment?.earnings.totalAmount}
          totalEarnings={payment?.grandTotalAmount}
        />
        <Divider />
        <PaymentBonuses loading={fetchingPayment} bonuses={payment?.bonuses} />
        <Divider />
        <PaymentPosts loading={fetchingPosts} posts={posts} />
      </Card>
    </>
  );
}
