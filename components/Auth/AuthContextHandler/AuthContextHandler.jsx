import React, { createContext, useContext } from "react";

const AuthDataContext = createContext();

export const useAuthData = () => useContext(AuthDataContext);

export const AuthProvider = ({ children, value }) => (
  <AuthDataContext.Provider value={value}>{children}</AuthDataContext.Provider>
);
