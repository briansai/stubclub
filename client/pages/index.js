import { useState } from 'react';
import Link from 'next/link';
import ReactPaginate from 'react-paginate';
import List from '../components/list';
import { paginate } from '../utils/paginate';

const LandingPage = ({ tickets }) => {
  const [selectedPage, setSelectedPage] = useState(1);
  const { data, pageCount } = paginate(tickets, selectedPage);
  const handlePageClick = event => {
    setSelectedPage(event.selected + 1);
    window.scrollTo(0, 0);
  };

  const ticketList = data.map(ticket => {
    const { id, title, price } = ticket;
    return (
      <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`} key={id}>
        <a className="ticket">
          <div className="ticket-title">{title}</div>
          <div className="ticket-price">
            <div className="ticket-price-name">price</div>
            <div className="ticket-price-num">{`$${price}`}</div>
          </div>
        </a>
      </Link>
    );
  });

  return (
    <div className="body">
      <div className="body-container">
        <h1 className="body-container-text">Tickets</h1>
        <div className="jumbotron">
          <div className="jumbotron-text">TICKETS</div>
        </div>
      </div>
      <List
        content={ticketList}
        className="tickets-all"
        message="There are no tickets available at the moment."
      />
      <div className="pagination-container">
        {pageCount > 1 && (
          <ReactPaginate
            pageCount={Math.ceil(tickets.length / 10)}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            onPageChange={handlePageClick}
            previousLabel="<"
            nextLabel=">"
            breakLabel="..."
            containerClassName={'pagination'}
            subContainerClassName={'pagination-pages'}
            activeClassName={'active'}
            eventListener="onClick"
          />
        )}
      </div>
    </div>
  );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get('/api/tickets');

  return { tickets: data };
};

export default LandingPage;
