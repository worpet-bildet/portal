import React, { useContext } from "react";
import { VisibilityContext } from "react-horizontal-scrolling-menu";

export const Card = ({ onClick, selected, title, itemId, children }) => {
  const visibility = useContext(VisibilityContext);

  return (
    <div onClick={() => onClick(visibility)} tabIndex={0} key={itemId}>
      {children}
    </div>
  );
};
