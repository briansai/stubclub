import { useEffect, useState, Fragment } from 'react';
import moment from 'moment';
import Link from 'next/link';
import StripeCheckout from 'react-stripe-checkout';
import Router from 'next/router';
import useRequest from '../../hooks/useRequest';

const Order = ({ order, currentUser }) => {
  const [timeLeft, setTimeLeft] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/payments',
    method: 'post',
    body: {
      orderId: order.id
    },
    onSuccess: () => Router.push('/orders')
  });

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      // const formattedTime = moment.utc(msLeft).format('mm:ss');
      setTimeLeft(msLeft);
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [order]);

  const content =
    timeLeft > 0
      ? {
          header: 'Order',
          body: (
            <Fragment>
              <div className="box-body-item">Order expires in: {timeLeft}</div>
              <div className="box-body-item">
                <StripeCheckout
                  token={({ id }) => doRequest({ token: id })}
                  stripeKey={process.env.STRIPE_PUBLISHABLE_KEY}
                  amount={order.ticket.price * 100}
                  email={currentUser.email}
                />
              </div>
            </Fragment>
          )
        }
      : {
          header: 'Order Expired',
          body: (
            <Link href="/">
              <button className="btn btn-primary">Back To Tickets</button>
            </Link>
          )
        };

  const { header, body } = content;
  return (
    <div className="box">
      <h2 className="header">{header}</h2>
      {errors}
      <div className="box-body">{body}</div>
    </div>
  );
};

Order.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};

export default Order;
