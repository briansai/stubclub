import { Fragment, useState, useCallback, useEffect } from 'react';
import Clipboard from '../icons/clipboard';
import { capitalize } from '../utils/capitalize';

const useCopyToClipboard = text => {
  const copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    document.body.appendChild(el);
    const selected =
      document.getSelection().rangeCount > 0
        ? document.getSelection().getRangeAt(0)
        : false;
    el.select();
    const success = document.execCommand('copy');
    document.body.removeChild(el);
    if (selected) {
      document.getSelection().removeAllRanges();
      document.getSelection().addRange(selected);
    }
    return success;
  };

  const [copied, setCopied] = useState(false);

  const copy = useCallback(() => {
    if (!copied) setCopied(copyToClipboard(text));
  }, [text]);
  useEffect(() => () => setCopied(false), [text]);
  return [copied, copy];
};

const Message = ({ cardInfo, message }) => {
  const [copied, copy] = useCopyToClipboard('4242424242424242');
  const contents = Object.entries(cardInfo);

  return (
    <Fragment>
      <div className="message">
        <div className="message-box">
          <div className="message-box-card">
            <div className="message-box-card-text">{message}</div>
            {contents.map((item, index) => {
              return (
                <div key={item[index]} className="message-box-card-contents">
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
