import { useState, Fragment } from 'react';
import Link from 'next/link';
import ReactPaginate from 'react-paginate';
import List from '../components/list';

const LandingPage = ({ currentUser, tickets }) => {
  const [selectedPage, setSelectedPage] = useState(1);
  let endIndex = 10 * selectedPage;
  let startIndex = endIndex - 10;
  const data =
    endIndex < tickets.length
      ? tickets.slice(startIndex, endIndex)
      : tickets.slice(startIndex, tickets.length);
  const handlePageClick = event => {
    setSelectedPage(event.selected + 1);
    window.scrollTo(0, 0);
  };

  const options = {
    noAction: 'No Action',
    edit: 'Edit',
    delete: 'Delete'
  };

  const optionEntries = Object.entries(options);

  const optionList = userId => (
    <Fragment>
      {currentUser.id === userId && (
        <select name="options">
          {optionEntries.map(option => (
            <option value={option[0]}>{option[1]}</option>
          ))}
        </select>
      )}
    </Fragment>
  );

  const ticketList = data.map(ticket => {
    const { id, title, price, userId } = ticket;
    return (
      <Link href="/tickets/[ticketId]" as={`/tickets/${ticket.id}`} key={id}>
        <a className="ticket-item">
          <div className="ticket-item-title">{title}</div>
          <div>{currentUser && optionList(userId)}</div>
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
        <h1 className="body-container-text">Tickets</h1>
        <div className="jumbotron">
          <div className="jumbotron-text">TICKETS</div>
        </div>
      </div>
      <List
        content={ticketList}
        className="ticket"
        message="There are no tickets available at the moment."
      />
      <div className="pagination-container">
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
      </div>
    </div>
  );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get('/api/tickets');

  return { tickets: data };
};

export default LandingPage;
