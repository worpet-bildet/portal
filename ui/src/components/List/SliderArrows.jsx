import React, { useState, useContext, useEffect } from "react";
import { VisibilityContext } from "react-horizontal-scrolling-menu";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

export const Arrow = ({ children, disabled, onClick, direction }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="flex flex-col justify-center items-center w-0 h-40 z-10"
      style={{
        opacity: disabled ? "0" : "1",
      }}
    >
      <div
        className={`flex items-center justify-center h-10 w-10 rounded-full bg-black shadow-md ${
          direction == "right" ? "mr-3" : "ml-3"
        }`}
      >
        {children}
      </div>
    </button>
  );
};

export const LeftArrow = () => {
  const { isFirstItemVisible, scrollPrev, visibleItemsWithoutSeparators, initComplete } =
    useContext(VisibilityContext);

  const [disabled, setDisabled] = useState(
    !initComplete || (initComplete && isFirstItemVisible)
  );
  useEffect(() => {
    // NOTE: detect if whole component visible
    if (visibleItemsWithoutSeparators.length) {
      setDisabled(isFirstItemVisible);
    }
  }, [isFirstItemVisible, visibleItemsWithoutSeparators]);

  return (
    <Arrow disabled={disabled} onClick={() => scrollPrev()} direction="left">
      <ChevronLeftIcon className="h-5 w-5 bg-black"></ChevronLeftIcon>
    </Arrow>
  );
};

export const RightArrow = () => {
  const { isLastItemVisible, scrollNext, visibleItemsWithoutSeparators } =
    useContext(VisibilityContext);

  const [disabled, setDisabled] = useState(
    !visibleItemsWithoutSeparators.length && isLastItemVisible
  );
  useEffect(() => {
    if (visibleItemsWithoutSeparators.length) {
      setDisabled(isLastItemVisible);
    }
  }, [isLastItemVisible, visibleItemsWithoutSeparators]);

  return (
    <Arrow disabled={disabled} onClick={() => scrollNext()} direction="right">
      <ChevronRightIcon className="h-5 w-5 bg-black"></ChevronRightIcon>
    </Arrow>
  );
};
