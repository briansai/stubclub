import { useState } from 'react';
import axios from 'axios';
import useRequest from '../../hooks/useRequest';

const inputText = {
  email: '',
  password: ''
};

export default () => {
  const [{ email, password }, setState] = useState(inputText);
  const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: {
      email,
      password
    }
  });
  const handleInputChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const onSubmit = async e => {
    e.preventDefault();

    doRequest();
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign Up</h1>
      <div className="form-group">
        <label>Email Address</label>
        <input
          name="email"
          value={email}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          name="password"
          value={password}
          onChange={handleInputChange}
          type="password"
          className="form-control"
        />
      </div>
      {errors}
      <button className="btn btn-primary">Sign Up</button>
    </form>
  );
};
