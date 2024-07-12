import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ msg, clearMessage }) => {
  return (
    <div className="alert alert-info alert-dismissible fade show" role="alert">
      {msg}
      <button type="button" className="close" aria-label="Close" onClick={clearMessage}>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

Message.propTypes = {
  msg: PropTypes.string.isRequired,
  clearMessage: PropTypes.func.isRequired
};

export default Message;
