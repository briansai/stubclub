import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import List from '../../components/list';
import Modal from '../../components/formModal';
import { paginate } from '../../utils/paginate';

const options = [
  {
    value: 'noAction',
    label: 'No Action'
  },
  {
    value: 'edit',
    label: 'Edit'
  }
];

const UserTickets = ({ tickets }) => {
  const [selectedPage, setSelectedPage] = useState(1);
  const [selectedTicket, setTicket] = useState(null);
  const [modal, setModal] = useState(false);
  const { data, pageCount } = paginate(tickets, selectedPage);
  const handlePageClick = event => {
    setSelectedPage(event.selected + 1);
    window.scrollTo(0, 0);
  };
  const handleOptionChange = (event, title, price) => {
    if (event.target.value === 'edit') {
      setModal(true);
      setTicket({ title, price });
    }
  };

  useEffect(() => {
    modal ? disableBodyScroll('body') : enableBodyScroll('body');
  });

  const ticketList = data.map(ticket => {
    const { id, title, price } = ticket;
    return (
      <div className="ticket" key={id}>
        <div className="ticket-title">{title}</div>
        <div className="ticket-item">
          <select onChange={e => handleOptionChange(e, title, price)}>
            {options.map(option => {
              const { value, label } = option;
              return (
                <option value={value} key={label}>
                  {label}
                </option>
              );
            })}
          </select>
        </div>
        <div className="ticket-item">
          <div className="ticket-item-name">price</div>
          <div className="ticket-item-num">{`$${price}`}</div>
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
      {modal && <Modal content={selectedTicket} setModal={setModal} />}
    </div>
  );
};

UserTickets.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get('/api/tickets/userTickets');

  return { tickets: data };
};

export default UserTickets;
