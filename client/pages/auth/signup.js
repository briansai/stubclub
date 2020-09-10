import { useState } from 'react';
import Router from 'next/router';
import { capitalize } from '../../utils/capitalize';
import useRequest from '../../hooks/useRequest';

const inputText = {
  email: '',
  password: ''
};

const SignIn = () => {
  const items = [
    { name: 'email', placeholder: 'e.g. stubclub@gmail.com' },
    { name: 'password', placeholder: 'Must be between 4-20 characters' }
  ];
  const [{ email, password }, setState] = useState(inputText);
  const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: {
      email,
      password
    },
    onSuccess: () => Router.push('/')
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const onSubmit = async e => {
    e.preventDefault();
    await doRequest();
  };

  return (
    <div className="form">
      <h1 className="header">Sign Up</h1>
      <div>{errors}</div>
      <form onSubmit={onSubmit}>
        {items.map(item => {
          const { name, placeholder } = item;
          return (
            <div className="form-group" key={name}>
              <label className="form-group-label">{capitalize(name)} </label>
              <input
                className="form-group-input"
                onChange={handleInputChange}
                name={name}
                placeholder={placeholder}
              />
            </div>
          );
        })}
        <div className="btn-container">
          <button className="btn btn-primary">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
