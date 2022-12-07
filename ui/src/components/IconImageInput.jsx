import React from "react";

export function IconImageInput(props) {
  return (
    <div className="flex flex-col justify-between">
      <label htmlFor="dropzone-file" className="flex flex-col justify-center items-center h-36 border border-black cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
        <p className="mb-2 text-xs text-center w-3/4 text-gray-500 dark:text-gray-400">The format should be 40x40 px</p>
        <input className='hidden' id="dropzone-file" type="file"/>
      </label>
      <button className="text-xs block font-bold border-2 border-black hover:bg-gray-800 hover:text-white py-1 w-full"> Upload an icon</button>
    </div>
  );
}