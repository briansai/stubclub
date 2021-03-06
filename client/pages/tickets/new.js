import { useState } from 'react';
import Router from 'next/router';
import { capitalize } from '../../utils/capitalize';
import useRequest from '../../hooks/useRequest';
import Button from '../../components/button';

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
      price: Number(price)
    },
    onSuccess: () => Router.push('/')
  });
  const { doRequest: seed } = useRequest({
    url: '/api/tickets/seed',
    method: 'post',
    body: { num: 200 },
    onSuccess: () => Router.push('/')
  });

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
    <div className="form-container">
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
                  value={name === 'price' ? price : title}
                />
              </div>
            );
          })}
          <Button color="primary" text="Submit" onClick={buttonClick} />
          {admin ? (
            <Button color="secondary" text="Seed" onClick={buttonClick} />
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default NewTicket;
