import { Fragment, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import List from '../../components/list';
import FormModal from '../../components/formModal';
import DeleteModal from '../../components/deleteModal';
import { paginate } from '../../utils/paginate';

const UserTickets = ({ tickets }) => {
  const options = ['No Action', 'Edit', 'Delete'];
  const [page, setPage] = useState(1);
  const [selectedTicket, setTicket] = useState(null);
  const [modalStatus, setModalStatus] = useState(false);
  const { data, pageCount } = paginate(tickets, page);

  const handlePageClick = event => {
    setPage(event.selected + 1);
    window.scrollTo(0, 0);
  };

  const ticketList = data.map((ticket, index) => {
    const [choice, setChoice] = useState('');
    const { id, title, price } = ticket;

    const handleOptionChange = (event, title, price) => {
      const { value } = event.target;
      setChoice(value);

      if (value === 'Edit' || 'Delete') {
        setModalStatus(true);
        setTicket([
          { value: title, name: 'title' },
          { value: price, name: 'price' }
        ]);
      }
    };

    const modal = () => {
      if (choice === 'Edit') {
        return (
          <Fragment>
            {modalStatus && selectedTicket[0].value === ticket.title && (
              <FormModal
                content={selectedTicket}
                setModalStatus={setModalStatus}
                id={id}
              />
            )}
          </Fragment>
        );
      } else if (choice === 'Delete') {
        return (
          <Fragment>
            {modalStatus && selectedTicket[0].value === ticket.title && (
              <DeleteModal setModalStatus={setModalStatus} id={id} />
            )}
          </Fragment>
        );
      }
      return null;
    };

    useEffect(() => {
      modalStatus ? disableBodyScroll('body') : enableBodyScroll('body');
      !modalStatus && setChoice(options[0]);
    }, [modalStatus]);

    return (
      <Fragment key={id}>
        <div className="ticket">
          <div className="ticket-title">{title}</div>
          <div className="ticket-item">
            {ticket.orderId ? (
              <div className="reserved">Reserved</div>
            ) : (
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
            )}
          </div>
          <div className="ticket-item">
            <div className="ticket-item-name">price</div>
            <div className="ticket-item-num">{`$${price}`}</div>
          </div>
        </div>
        {modal()}
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
