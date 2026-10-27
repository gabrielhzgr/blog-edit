import Error from "../../Components/Error/Error.jsx";
import useAuth from "../../hooks/useAuth.jsx";
import { useEffect, useState } from "react";
import "./Login.css";
import Nav from "../../Components/Nav/Nav.jsx";

function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const { login, error, isPending, setPending } = useAuth();

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      e.target.querySelector("button").disabled = true;
      setPending(true);
      login({ username, password });
    } catch (err) {
      console.log(err);
    }
  }

  const button = isPending ? (
    <button disabled>Login</button>
  ) : (
    <button>Login</button>
  );

  console.log(button.disabled);

  return (
    <>
      <Nav></Nav>
      <main className="login">
        {error ? <Error error={error} /> : null}
        {isPending ? "Verifying" : null}
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
          {button}
        </form>
      </main>
    </>
  );
}

export { Login };
