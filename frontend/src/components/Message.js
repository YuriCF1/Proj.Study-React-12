import React from "react";

import "./Message.css";

export const Message = ({ msg, type }) => {
  return (
    <div className={`message ${type}`}>
      <p>{msg}</p>
    </div>
  );
};

export default Message;
