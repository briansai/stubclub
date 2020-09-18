import { Fragment } from 'react';

const List = ({ message, className, content }) => {
  return (
    <Fragment>
      {content ? (
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
