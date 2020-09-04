const OrderIndex = ({ orders }) => (
  <ul>
    {orders.map(order => {
      const { id, ticket, status } = order;
      return (
        <li key={id}>
          {ticket.title} - {status}
        </li>
      );
    })}
  </ul>
);

OrderIndex.getInitialProps = async (context, client) => {
  const { data } = await client.get('/api/orders');

  return { orders: data };
};

export default OrderIndex;
