import React from 'react';

const Modal = ({ content }) => {
  const { title, price } = content;

  return (
    <div className="modal">
      <div className="modal-content"></div>
    </div>
  );
};

export default Modal;
