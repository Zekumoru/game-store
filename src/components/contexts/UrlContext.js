import React, { useContext } from 'react';

const UrlContext = React.createContext();

function useUrl() {
  return useContext(UrlContext);
}

function UrlProvider({ url, children }) {
  return <UrlContext.Provider value={url}>{children}</UrlContext.Provider>;
}

export { useUrl, UrlProvider };
