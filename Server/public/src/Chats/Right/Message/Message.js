import React from 'react';

function Message({ id, content, created, sender, username }) {

  if (sender.username === username) {
    return (
      <div className="message-box my-message">
        <p>
          {content}
          <br />
          <span>{created}</span>
        </p>
      </div>
    );
  }
  else {
    return (
      <div className="message-box friend-message">
        <p>
          {content}
          <br />
          <span>{created}</span>
        </p>
      </div>
    );
  }
}

export default Message;
