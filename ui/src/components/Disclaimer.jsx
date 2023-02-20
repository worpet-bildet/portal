import React from "react";

export function Disclaimer({ color, message, textSize }) {
  return (
    <div
      className={`border border-2 border-${color}-700 font-bold text-${
        textSize ? textSize : "xl"
      } text-${color}-800 p-4 flex items-center`}
    >
      <i className={"fa fa-question-circle fa-2x mr-4"}></i>
      <div>{message}</div>
    </div>
  );
}
