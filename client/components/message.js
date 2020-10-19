import { Fragment } from 'react';
import Clipboard from '../icons/clipboard';
import { capitalize } from '../utils/capitalize';
import { useCopyToClipboard } from '../utils/clipboard';

const Message = ({ info, message }) => {
  const [copied, copy] = useCopyToClipboard('4242424242424242');
  const contents = Object.entries(info);

  return (
    <Fragment>
      <div className="message">
        <div className="message-box">
          <div className="message-box-card">
            <div className="message-box-card-text">{message}</div>
            {contents.map(item => {
              return (
                <div key={item[0]} className="message-box-card-contents">
                  <div>
                    {capitalize(item[0])}: {item[1]}
                  </div>
                  {typeof item[1] === 'number' && (
                    <button className="clipboard" onClick={copy}>
                      <Clipboard />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
          <div className="copied">{copied && 'Copied!'}</div>
        </div>
      </div>
    </Fragment>
  );
};

export default Message;
