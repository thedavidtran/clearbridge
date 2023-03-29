const Button = ({ children, className, ...rest }) => {
  return (
    <button
      className={`w-100 rounded-full px-4 py-1 mx-1 items-center bg-slate-400 hover:bg-slate-300 ${className}`}
      {...rest}
    >
      <span className="text-white">{children}</span>
    </button>
  );
};

export default Button;
