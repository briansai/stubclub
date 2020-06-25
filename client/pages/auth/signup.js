import { useState } from 'react';
import axios from 'axios';

const inputText = {
  email: '',
  password: ''
};

export default () => {
  const [{ email, password }, setState] = useState(inputText);
  const [errors, setErrors] = useState([]);
  const handleInputChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const onSubmit = async e => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/users/signup', {
        email,
        password
      });
    } catch (err) {
      setErrors(err.response.data.errors);
    }
  };

  const errorMessage = () => (
    <div className="alert alert-danger">
      <h4>Something went wrong</h4>
      <ul className="my-0">
        {errors.map(err => (
          <li key={err.message}>{err.message}</li>
        ))}
      </ul>
    </div>
  );

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
      {errors.length > 0 && errorMessage()}
      <button className="btn btn-primary">Sign Up</button>
    </form>
  );
};
