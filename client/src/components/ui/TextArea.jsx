import { forwardRef } from "react";

const TextArea = forwardRef(({ className, ...rest }, ref) => {
  return (
    <textarea
      className={`p-1 border border-gray-400 focus:border-blue-500 outline-none rounded ${className}`}
      {...rest}
      ref={ref}
    />
  );
});

export default TextArea;
