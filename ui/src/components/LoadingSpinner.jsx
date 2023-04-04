import React, { useState } from "react";

export const LoadingSpinner = () => {
  const [text, setText] = useState("Loading...");
  setTimeout(() => setText("Still loading..."), 4000);
  return (
    <div className="h-full w-full text-center flex absolute items-center justify-center">
      {text}
    </div>
  );
};
