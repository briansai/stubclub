import { Fragment } from 'react';

const List = ({ message, className, content }) => {
  const list =
    (Array.isArray(content) && content.length) ||
    (!Array.isArray(content) &&
      typeof content === 'object' &&
      content.props.children[1].length);
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
