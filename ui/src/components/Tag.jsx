import React from "react";

export function Tag({ name }) {
  return (
    <li>
      <div className="flex flex-row border border-black font-semibold hover:bg-gray-400 gap-2 p-2">
        <span className="flex items-center capitalize">
          <p>{name}</p>
        </span>
      </div>
    </li>
  );
}
