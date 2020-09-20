import { Fragment } from 'react';

const List = ({ message, className, content }) => {
  const list =
    (Array.isArray(content) && content.length) ||
    Object.getPrototypeOf(content) === Object.prototype;
  return (
    <Fragment>
      {list ? (
        <div className={className}>{content}</div>
      ) : (
        <div className="empty">
          <div className="empty-text">{message}</div>
        </div>
      )}
    </Fragment>
  );
};
export default List;
