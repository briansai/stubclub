import { useEffect, useState, Fragment } from 'react';
import moment from 'moment';
import Link from 'next/link';
import StripeCheckout from 'react-stripe-checkout';
import Router from 'next/router';
import useRequest from '../../hooks/useRequest';
import Message from '../../components/message';

const Order = ({ order, currentUser }) => {
  const [timeLeftSec, setTimeLeftSec] = useState('');
  const [formattedTimeLeft, setFormattedTime] = useState('');
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
      const formattedTime = moment.utc(msLeft).format('mm:ss');

      setFormattedTime(formattedTime);
      setTimeLeftSec(msLeft);
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [order]);

  const cardInfo = {
    card: 4242424242,
    expiration: 'Any future date',
    cvv: 'Any three numbers'
  };

  const content =
    timeLeftSec > 0
      ? {
          header: 'Order',
          body: (
            <Fragment>
              <div className="box-body-item">
                Order expires in: {formattedTimeLeft}
              </div>
              <div className="box-body-item">
                <StripeCheckout
                  token={({ id }) => doRequest({ token: id })}
                  stripeKey={process.env.STRIPE_PUBLISHABLE_KEY}
                  amount={order.ticket.price * 100}
                  email={currentUser.email}
                >
                  <button className="btn btn-primary">Pay With Card</button>
                </StripeCheckout>
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
    <Fragment>
      <Message
        cardInfo={cardInfo}
        message="Please use this information before purchasing."
      />
      <div className="box">
        <h2 className="header">{header}</h2>
        {errors}
        <div className="box-body">{body}</div>
      </div>
    </Fragment>
  );
};

Order.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};

export default Order;
