import Router from 'next/router';
import useRequest from '../../hooks/useRequest';

const Ticket = ({ ticket }) => {
  const { title, price } = ticket;
  const { doRequest, errors } = useRequest({
    url: '/api/orders',
    method: 'post',
    body: {
      ticketId: ticket.id
    },
    onSuccess: order => Router.push('/orders/[orderId]', `/orders/${order.id}`)
  });
  return (
    <div>
      <h1>{title}</h1>
      <h4>Price: {price}</h4>
      {errors}
      <button className="btn btn-primary" onClick={doRequest}>
        Purchase
      </button>
    </div>
  );
};

Ticket.getInitialProps = async (context, client) => {
  const { ticketId } = context.query;
  const { data } = await client.get(`/api/tickets/${ticketId}`);

  return { ticket: data };
};

export default Ticket;
