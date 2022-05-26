import React from "react";

const Error = ({ error }) => {
  return (
    <div>
      <h1>Oops~!!! {error.code} Error.</h1>
      <p>{error.message}</p>
    </div>
  );
};

export default React.memo(Error);
