import React from "react";

export const TextAreaInput = React.forwardRef(({label, name, rows, value, ...rest}, ref) => {
  return (
    <div ref={ref}>
      <label htmlFor={name} className="block text-sm font-semibold text-gray-800">{label}</label>
      <textarea
        className="border border-gray-800 text-gray-800 text-sm  focus:ring-gray-900 focus:border-gray-900 block w-full"
        name={name}
        rows={rows}
        value={value}
        {...rest}
      >
      </textarea>
    </div>
  );
});