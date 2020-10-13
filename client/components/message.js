import { useState, useCallback, useEffect, createRef } from 'react';
import Clipboard from '../icons/clipboard';
import { capitalize } from '../utils/capitalize';

const Message = ({ cardInfo, message }) => {
  const [copied, copy] = useState(false);
  const contents = Object.entries(cardInfo);
  const handleCopy = () => {
    copy(true);
  };
  return (
    <div className="message">
      <div className="message-box">
        <div className="message-box-text">{message}</div>
        {contents.map((item, index) => {
          return (
            <div key={item[index]} className="message-box-contents">
              <div>
                {capitalize(item[0])}: {item[1]}
              </div>
              {typeof item[1] === 'number' && (
                <button className="clipboard" onClick={handleCopy}>
                  <Clipboard />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Message;
