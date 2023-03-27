import React from "react";

import "./Message.css";

const message = ({ msg, type }) => {
  return (
    <div className={`message ${type}`}>
      <p>{msg}</p>
    </div>
  );
};

export default message;
