import React from "react";

export const Card = ({ itemId, children }) => {
  return (
    <div tabIndex={0} key={itemId}>
      {children}
    </div>
  );
};
