import { Form, useActionData } from "react-router";
import useAuth from "../../hooks/useAuth.jsx";
import { useState } from "react";

function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    e.target.querySelector("button").disabled = true;
    await login({ username, password });
  }

  return (
    <main>
      <form method="POST" onSubmit={handleSubmit}>
        <h1>Login as editor</h1>
        <label htmlFor="username">
          <span>Username</span>
          <input
            id="username"
            onChange={(e) => setUserName(e.target.value)}
            type="text"
            name="username"
            value={username}
            required
          />
        </label>
        <label htmlFor="password">
          <span>Password</span>
          <input
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            type="text"
            name="password"
            value={password}
            required
          />
        </label>
        <button>Submit</button>
      </form>
    </main>
  );
}

export { Login };
