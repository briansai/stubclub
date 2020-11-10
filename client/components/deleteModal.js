import React from 'react';
import Router from 'next/router';
import Button from './button';
import useRequest from '../hooks/useRequest';

const DeleteModal = ({ content, setModalStatus, id }) => {
  const { doRequest, errors } = useRequest({
    url: `/api/tickets/${id}`,
    method: 'delete',
    body: {},
    onSuccess: () => {
      setModalStatus(false);
      return Router.push('/tickets');
    }
  });

  const buttonClick = async event => {
    event.preventDefault();

    await doRequest();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="form">
          <button className="close" onClick={() => setModalStatus(false)}>
            X
          </button>
          <div className="delete">
            Are you sure you want to delete this ticket?
          </div>
          <Button color="danger" text="delete" onClick={buttonClick} />
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
