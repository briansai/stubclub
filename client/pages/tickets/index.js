import { Fragment, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import List from '../../components/list';
import Modal from '../../components/formModal';
import { paginate } from '../../utils/paginate';

const UserTickets = ({ tickets }) => {
  const options = ['No Action', 'Edit'];
  const [page, setPage] = useState(1);
  const [selectedTicket, setTicket] = useState(null);
  const [modal, setModal] = useState(false);
  const { data, pageCount } = paginate(tickets, page);

  const handlePageClick = event => {
    setPage(event.selected + 1);
    window.scrollTo(0, 0);
  };

  const ticketList = data.map(ticket => {
    const [choice, setChoice] = useState('');
    const { id, title, price } = ticket;

    const handleOptionChange = (event, title, price) => {
      if (event.target.value === 'Edit') {
        setModal(true);
        setChoice(options[1]);
        setTicket([
          { value: title, name: 'title' },
          { value: price, name: 'price' }
        ]);
      }
    };

    useEffect(() => {
      modal ? disableBodyScroll('body') : enableBodyScroll('body');
      !modal && setChoice(options[0]);
    }, [modal]);

    return (
      <Fragment key={id}>
        <div className="ticket">
          <div className="ticket-title">{title}</div>
          <div className="ticket-item">
            <select
              value={choice}
              onChange={e => handleOptionChange(e, title, price)}
            >
              {options.map((option, index) => {
                return (
                  <option value={option} key={index}>
                    {option}
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
        {modal && (
          <Modal content={selectedTicket} setModal={setModal} id={id} />
        )}
      </Fragment>
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
