import React, { useContext } from 'react';

const ElementContext = React.createContext();

function useElement() {
  return useContext(ElementContext);
}

function ElementProvider({ element, children }) {
  return (
    <ElementContext.Provider value={element}>
      {children}
    </ElementContext.Provider>
  );
}

export { ElementProvider, useElement };
