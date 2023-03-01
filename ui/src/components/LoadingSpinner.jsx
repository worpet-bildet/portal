import React from "react";
export default function LoadingSpinner({ loadingText }) {
  return (
    <div class="absolute top-0 left-0 h-full w-full flex items-center justify-center">
      <img
        className="w-1/4 h-1/4 animate-ping absolute"
        src="https://toptyr-bilder.nyc3.cdn.digitaloceanspaces.com/logo2.svg"
      ></img>
      <div className="absolute">{loadingText}</div>
    </div>
  );
}
