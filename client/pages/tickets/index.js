import { Fragment, useState } from 'react';
import Link from 'next/link';
import ReactPaginate from 'react-paginate';
import List from '../../components/list';

const UserTickets = ({ tickets }) => {
  const [selectedPage, setSelectedPage] = useState(1);
  const itemsPerPage = 10;
  let endIndex = itemsPerPage * selectedPage;
  let startIndex = endIndex - itemsPerPage;
  const pageCount = Math.ceil(tickets.length / 10);
  const data =
    endIndex < tickets.length
      ? tickets.slice(startIndex, endIndex)
      : tickets.slice(startIndex, tickets.length);
  const handlePageClick = event => {
    setSelectedPage(event.selected + 1);
    window.scrollTo(0, 0);
  };

  const ticketList = data.map(ticket => {
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

  return (
    <div className="body">
      <div className="body-container">
        <h1 className="body-container-text">My Tickets</h1>
        <div className="jumbotron">
          <div className="jumbotron-text">MY TICKETS</div>
        </div>
      </div>
      <List
        content={ticketList}
        className="ticket"
        message="You currently have no tickets listed at the moment."
      />
      <div className="pagination-container">
        {pageCount > 1 && (
          <ReactPaginate
            pageCount={pageCount}
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

UserTickets.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get('/api/tickets/userTickets');

  return { tickets: data };
};

export default UserTickets;
