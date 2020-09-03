import { useState } from 'react';
import Router from 'next/router';
import { capitalize } from '../../utils/capitalize';
import useRequest from '../../hooks/useRequest';

const input = {
  title: '',
  price: ''
};

const NewTicket = () => {
  const items = ['title', 'price'];
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
    <div>
      <h1>Create a new ticket</h1>
      <form onSubmit={onSubmit}>
        {items.map(item => {
          return (
            <div className="form-group" key={item}>
              <label>{capitalize(item)}</label>
              <input
                className="form-control"
                onChange={handleInputChange}
                name={item}
              />
            </div>
          );
        })}
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default NewTicket;
