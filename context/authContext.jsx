import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

 const AuthProvider = ({ children })=> {
  const [user, setUser] = useState(null);

  const login = async (
    email,
    password
  )=> {
    try {
      setUser({
        email,
        password,
      });
      return { success: true };
    } catch (err) {
      return { success: false, msg: err.message || "Login failed" };
    }
  };

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};

const useGlobalContext = () => {
  if (!AuthContext) {
    throw new Error("useGlobalContext must be used within an AuthProvider");
  } else {
    return useContext(AuthContext);
  }
};

export { AuthContext, useGlobalContext, AuthProvider };
