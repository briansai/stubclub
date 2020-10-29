import React from 'react';
import Button from './button';
import { capitalize } from '../utils/capitalize';

const FormModal = ({ content }) => {
  const items = Object.entries(content);
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
          <h1 className="header">Create a new ticket</h1>
          {/* <div className="form-error">{errors}</div> */}
          <form>
            {items.map(item => {
              const label = item[0];
              const value = item[1];
              return (
                <div className="form-group" key={label}>
                  <div className="form-group-label">
                    <label className="form-group-label-text">
                      {capitalize(label)}{' '}
                    </label>
                  </div>
                  <input
                    className="form-group-input"
                    onChange={handleInputChange}
                    name={label}
                    value={value}
                  />
                </div>
              );
            })}
            <Button color="primary" text="Submit" onClick={buttonClick} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormModal;
