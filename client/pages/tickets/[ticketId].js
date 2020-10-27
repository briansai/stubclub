import Link from 'next/link';
import Router from 'next/router';
import useRequest from '../../hooks/useRequest';

const Ticket = ({ ticket, currentUser }) => {
  const { title, price } = ticket;
  const { doRequest } = useRequest({
    url: '/api/orders',
    method: 'post',
    body: {
      ticketId: ticket.id
    },
    onSuccess: order => Router.push('/orders/[orderId]', `/orders/${order.id}`)
  });
  return (
    <div className="purchase">
      <div className="title">{title}</div>
      <h4>Price: ${price}</h4>
      {!currentUser ? (
        <button className="btn btn-secondary">
          <Link href="/auth/signup">Purchase</Link>
        </button>
      ) : (
        <button className="btn btn-secondary" onClick={() => doRequest()}>
          Purchase
        </button>
      )}
    </div>
  );
};

Ticket.getInitialProps = async (context, client) => {
  const { ticketId } = context.query;
  const { data } = await client.get(`/api/tickets/${ticketId}`);

  return { ticket: data };
};

export default Ticket;
