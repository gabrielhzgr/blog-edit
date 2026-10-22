import Error from "../../Components/Error/Error.jsx";
import useAuth from "../../hooks/useAuth.jsx";
import { useEffect, useState } from "react";
import "./Login.css";
import Nav from "../../Components/Nav/Nav.jsx";

function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const { login, user, setUser, error, setError } = useAuth();
  const [isPending, setPending] = useState(false);

  useEffect(() => {
    if (isPending) {
      if (user || error) {
        setPending(false);
      } else {
        login({ username, password });
      }
    }
  }, [isPending, user, error]);

  async function handleSubmit(e) {
    e.preventDefault();
    e.target.querySelector("button").disabled = true;
    setPending(true);
    setError(null);
    setUser(null);
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
        {error ? (
          <Error
            title={`${error.status}: ${error.name} `}
            message={error.statusText}
          />
        ) : null}
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
