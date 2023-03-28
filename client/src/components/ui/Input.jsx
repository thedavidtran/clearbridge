import { forwardRef } from "react";

const Input = forwardRef(({ className, ...rest }, ref) => {
  return (
    <input
      className={`p-1 border border-gray-400 focus:border-blue-500 outline-none rounded ${className}`}
      {...rest}
      ref={ref}
    />
  );
});

export default Input;
