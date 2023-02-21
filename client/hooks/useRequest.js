import axios from 'axios';
import { useState } from 'react';

const useRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);
  const doRequest = async (props = {}) => {
    try {
      setErrors(null);

      const response = await axios[method](url, { ...body, ...props });
      const data = response;

      if (onSuccess) {
        onSuccess(data);
      }

      return data;
    } catch (error) {
      const { data } = error.response;
      setErrors(
        <div className="error">
          <div className="error-text">Something went wrong:</div>
          <ul>
            {data.errors.map((err) => {
              const { message } = err;
              return <li key={message}>{message}</li>;
            })}
          </ul>
        </div>
      );
    }
  };

  return { doRequest, errors };
};

export default useRequest;
