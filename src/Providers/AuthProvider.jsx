import { createContext, useEffect, useState, useCallback } from "react";
import db from "../db/db.js";
import isValidToken from "../lib/isValidToken.js";
import { redirect, useNavigate } from "react-router";
import router from "../router.jsx";
const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const localUser = localStorage.getItem("user");
  const localToken = localStorage.getItem("token");

  const [user, setUser] = useState(
    localUser == "undefined" ? null : JSON.parse(localUser),
  );
  const [token, setToken] = useState(
    localToken == "undefined" ? null : JSON.parse(localToken),
  );

  const [error, setError] = useState(null);

  console.log(token);
  console.log(user);

  if (token && !isValidToken(token)) {
    setUser(null);
    setToken(null);
  }

  async function login(credentials) {
    const { user, token, error } = await db.user.login(credentials);
    if (error) {
      setError(error);
    } else {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", JSON.stringify(token));

      console.log("loging");

      setUser(user);
      setToken(token);

      router.navigate("/");
    }
  }

  async function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null);
    setToken(null);

    router.navigate("/");
  }

  return (
    <AuthContext value={{ user, token, error, setError, login, logout }}>
      {children}
    </AuthContext>
  );
}

export { AuthProvider, AuthContext };
