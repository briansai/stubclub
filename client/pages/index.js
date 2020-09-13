import Link from 'next/link';

const LandingPage = ({ currentUser, tickets }) => {
  const ticketList = tickets.map(ticket => {
    const { id, title, price } = ticket;
    return (
      <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`} key={id}>
        <a className="ticket-item">
          <div className="ticket-item-title">{title}</div>
          <div className="ticket-item-price">
            <div className="ticket-item-price-name">price</div>
            <div className="ticket-item-price-num">{`$${price}`}</div>
          </div>
        </a>
      </Link>
    );
  });

  const list = ticketList.length ? (
    <div className="ticket">{ticketList}</div>
  ) : (
    <div className="empty">
      <div className="empty-text">
        There are no tickets available at the moment.
      </div>
    </div>
  );

  return (
    <div className="body">
      <div className="body-container">
        <h1 className="body-container-text">Tickets</h1>
        <div className="jumbotron">
          <div className="jumbotron-text">TICKETS</div>
        </div>
      </div>
      {list}
    </div>
  );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get('/api/tickets');

  return { tickets: data };
};

export default LandingPage;
