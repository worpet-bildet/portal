import React from "react";
import { useNavigate } from "react-router-dom";

export function GoBack(props) {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  }

  return (
    <button onClick={goBack} className="flex gap-2 text-lg">
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
      {props.titlePreviousPage}
    </button>
  );
}