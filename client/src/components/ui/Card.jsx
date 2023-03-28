const Card = ({ children }) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-screen-lg w-full">{children}</div>
    </div>
  );
};

Card.Body = ({ children }) => {
  return <div className="shadow bg-white p-4 rounded-lg">{children}</div>;
};

export default Card;
