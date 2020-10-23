import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import List from '../../components/list';
import { paginate } from '../../utils/paginate';

const UserTickets = ({ tickets }) => {
  const [selectedPage, setSelectedPage] = useState(1);
  const { data, pageCount } = paginate(tickets, selectedPage);
  const handlePageClick = event => {
    setSelectedPage(event.selected + 1);
    window.scrollTo(0, 0);
  };

  const ticketList = data.map(ticket => {
    const { id, title, price } = ticket;
    return (
      <div className="ticket" key={id}>
        <div className="ticket-title">{title}</div>
        <div className="ticket-price">
          <div className="ticket-price-name">price</div>
          <div className="ticket-price-num">{`$${price}`}</div>
        </div>
      </div>
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
        className="tickets"
        message="You currently do not have any tickets listed at the moment."
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
