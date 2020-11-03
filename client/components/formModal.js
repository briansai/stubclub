import React, { useState } from 'react';
import Button from './button';
import { capitalize } from '../utils/capitalize';

const inputText = {
  title: '',
  price: ''
};

const FormModal = ({ content, setModal }) => {
  const [{ title, price }, setState] = useState({ inputText });
  const inputs = [title, price];
  const buttonClick = event => {
    event.preventDefault();

    event.target.name === 'Submit' ? doRequest() : seed();
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    if (name !== 'price') {
      setState(prevState => ({ ...prevState, [name]: value }));
    } else {
      const onlyNums = parseFloat(value);
      let input = '';

      if (onlyNums) {
        input = onlyNums;
      }

      setState(prevState => ({ ...prevState, [name]: input }));
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="form">
          <button className="close" onClick={() => setModal(false)}>
            X
          </button>
          <h1 className="header">Edit Ticket</h1>
          {/* <div className="form-error">{errors}</div> */}
          <form>
            {content.map((items, index) => {
              const { value, name } = items;
              return (
                <div className="form-group" key={name}>
                  <div className="form-group-label">
                    <label className="form-group-label-text">
                      {capitalize(name)}{' '}
                    </label>
                  </div>
                  <input
                    className="form-group-input"
                    onChange={handleInputChange}
                    name={name}
                    value={inputs[index] || value}
                  />
                </div>
              );
            })}
            <Button color="primary" text="Edit" onClick={buttonClick} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormModal;
