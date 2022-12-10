import React from "react";

export const Input = React.forwardRef(({label, name, placeholder, value, ...rest}, ref) => {
  return (
    <div>
      <label className="text-sm font-semibold text-gray-800" htmlFor={name}>{label}</label>
      <input
        name={name}
        type="text"
        className="border border-gray-800 text-gray-800 text-sm focus:ring-gray-900 focus:border-gray-900 w-full p-1.5"
        placeholder={placeholder}
        value={value}
        {...rest}
        ref={ref}
      />
    </div>
  );
});