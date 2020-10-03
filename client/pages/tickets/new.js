import { useState } from 'react';
import Router from 'next/router';
import { capitalize } from '../../utils/capitalize';
import useRequest from '../../hooks/useRequest';

const input = {
  title: '',
  price: ''
};

const NewTicket = ({ admin }) => {
  const items = [
    { name: 'title', placeholder: 'Ticket Name' },
    { name: 'price', placeholder: 'e.g. 456' }
  ];
  const [{ title, price }, setState] = useState(input);
  const { doRequest, errors } = useRequest({
    url: '/api/tickets',
    method: 'post',
    body: {
      title,
      price: parseFloat(price).toFixed()
    },
    onSuccess: () => Router.push('/')
  });

  const onSubmit = event => {
    event.preventDefault();

    doRequest();
  };

  const handleInputChange = e => {
    const { name, value } = e.target;

    setState(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="form">
      <h1 className="header">Create a new ticket</h1>
      <div className="form-error">{errors}</div>
      <form>
        {items.map(item => {
          const { name, placeholder } = item;
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
                placeholder={placeholder}
              />
            </div>
          );
        })}
        {admin ? (
          <div className="btn-container">
            <button className="btn btn-secondary">Seed</button>
          </div>
        ) : null}
        <div className="btn-container" onClick={onSubmit}>
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default NewTicket;
