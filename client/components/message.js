import Clipboard from '../icons/clipboard';
import { capitalize } from '../utils/capitalize';

const Message = ({ message }) => {
  const contents = Object.entries(message);

  return (
    <div className="message">
      <div className="message-box">
        {contents.map((item, index) => {
          return (
            <div key={item[index]} className="message-box-contents">
              <div>
                {capitalize(item[0])}: {item[1]}
              </div>
              <Clipboard />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Message;
