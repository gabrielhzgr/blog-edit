import { createContext, useEffect, useState, useCallback } from "react";
import api from "../api/api.js";
import isValidToken from "../lib/isValidToken.js";
import { redirect, useNavigate } from "react-router";
import router from "../router.jsx";
const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const localUser = localStorage.getItem("user");
  const localToken = localStorage.getItem("token");

  const [user, setUser] = useState(localUser ? JSON.parse(localUser) : null);
  const [token, setToken] = useState(
    localToken ? JSON.parse(localToken) : null,
  );

  const [error, setError] = useState(null);

  console.log(token);
  console.log(user);

  if (token && !isValidToken(token)) {
    console.log("not valid token");
    setUser(null);
    setToken(null);
  }

  async function login(credentials) {
    const result = await api.user.login(credentials);
    if (result.error) {
      setError(result.error);
      setUser(null);
      setToken(null);
    } else {
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.token));
      setUser(result.user);
      setToken(result.token);
      setError(null);
      router.navigate("/posts");
    }
  }

  async function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null);
    setToken(null);

    router.navigate("/posts");
  }

  return (
    <AuthContext
      value={{ user, setUser, token, error, setError, login, logout }}
    >
      {children}
    </AuthContext>
  );
}

export { AuthProvider, AuthContext };
