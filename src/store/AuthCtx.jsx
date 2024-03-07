import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useState } from "react";

function parseJwtTokenData(token) {
  if (!token) return {};

  //Parse token
  const tokenValues = jwtDecode(token);

  const dateNow = Date.now() / 1000;

  if (dateNow > tokenValues.exp) {
    localStorage.removeItem("bit_token");
    return {};
  }

  return { ...tokenValues, token };
}

const AuthContext = createContext({
  login() {},
  logout() {},
  isUserLoggedIn: false,
  token: null,
  userEmail: "",
  role: "",
  userId: "",
  userName: "",
});

function AuthCtxProvider({ children }) {
  let tokenData = parseJwtTokenData(localStorage.getItem("bit_token"));

  const [token, setToken] = useState(tokenData?.token || "");
  const [userEmail, setUserEmail] = useState(tokenData?.email || "");
  const [role, setRole] = useState(tokenData?.role || "");
  const [userName, setUserName] = useState(tokenData?.userName || "");

  const isUserLoggedIn = !!token;
  let userId = tokenData?.sub || "";

  function login(token) {
    const { email, sub, role } = parseJwtTokenData(token);
    setToken(token);
    setUserEmail(email);
    setRole(role);
    userId = sub;
    localStorage.setItem("bit_token", token);
  }
  function logout() {
    setToken("");
    setUserEmail("");
    setRole("");

    localStorage.removeItem("bit_token");
  }

  const ctxValue = {
    login,
    logout,
    userName,
    token,
    isUserLoggedIn,
    userEmail,
    role,
    userId,
  };

  return <AuthContext.Provider value={ctxValue}> {children} </AuthContext.Provider>;
}

export default AuthCtxProvider;

export function useAuthContext() {
  return useContext(AuthContext);
}
