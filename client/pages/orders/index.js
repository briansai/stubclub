import { Fragment } from 'react';
import List from '../../components/list';

const OrderIndex = ({ orders }) => {
  const subject = ['Ticket', 'Status'].map(header => (
    <div className="orders-subject-name" key={header}>
      {header}
    </div>
  ));

  const textColor = {
    created: 'blue',
    complete: 'green',
    cancelled: 'red'
  };

  const items = orders.map(order => {
    const { id, ticket, status } = order;
    return (
      <div className="orders-items-list" key={id}>
        <div className="orders-items-list-item">{ticket.title}</div>
        <div className={`orders-items-list-item ${textColor[status]}`}>
          {status}
        </div>
      </div>
    );
  });

  const content = () => {
    return (
      <Fragment>
        <div className="orders-subject">{subject}</div>
        <div className="orders-items">{items}</div>
      </Fragment>
    );
  };

  return (
    <div className="body">
      <div className="body-container">
        <h1 className="body-container-text">My Orders</h1>
        <div className="jumbotron">
          <div className="jumbotron-text">MY ORDERS</div>
        </div>
      </div>
      <List
        content={content()}
        className="orders"
        message="You do not have any orders at this moment."
      />
    </div>
  );
};

OrderIndex.getInitialProps = async (context, client) => {
  const { data } = await client.get('/api/orders');

  return { orders: data };
};

export default OrderIndex;
