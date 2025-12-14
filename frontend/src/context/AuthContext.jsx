// import { createContext, useContext, useState } from "react";
// import { jwtDecode } from "jwt-decode";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const storedToken = localStorage.getItem("token");
//   const [token, setToken] = useState(storedToken);

//   const getRoleFromToken = (token) => {
//     try {
//       const decoded = jwtDecode(token);
//       return decoded.role;
//     } catch {
//       return null;
//     }
//   };

//   const [role, setRole] = useState(
//     storedToken ? getRoleFromToken(storedToken) : null
//   );

//   const login = (token) => {
//     localStorage.setItem("token", token);
//     setToken(token);
//     setRole(getRoleFromToken(token));
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     setToken(null);
//     setRole(null);
//   };

//   return (
//     <AuthContext.Provider value={{ token, role, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      setRole(decoded.role);

      const expiryTime = decoded.exp * 1000 - Date.now();

      if (expiryTime <= 0) {
        logout();
      } else {
        const timeout = setTimeout(logout, expiryTime);
        return () => clearTimeout(timeout);
      }
    } catch {
      logout();
    }
  }, [token]);

  const login = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
