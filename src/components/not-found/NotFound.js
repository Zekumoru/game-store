import React from 'react';

function NotFound({ children }) {
  return (
    <div className="NotFound container">
      <h2>Uh oh!</h2>
      <p>{children}</p>
    </div>
  );
}

export default NotFound;
