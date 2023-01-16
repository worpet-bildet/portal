import React from 'react';

function Alert({ color, message, icon }) {
  return (
    <div className={`text-bold text-${color}-500 p-0 flex items-center`}>
      <i className={`fa fa-${icon} fa-2x mr-4`}></i>
      <div>{message}</div>
    </div>
  );
}

export default Alert;
