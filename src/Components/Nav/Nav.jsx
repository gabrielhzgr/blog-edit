import { Link, Form, useNavigate } from "react-router";
import "./Nav.css";
import useAuth from "../../hooks/useAuth";

export default function Nav() {
  const navigate = useNavigate();
  const { user, login, logout } = useAuth();

  async function clickHandler(e) {
    e.preventDefault();
    await logout();
  }

  return (
    <nav>
      <ul>
        <li>
          <Link to="/posts">Home</Link>
        </li>
        <ul className="actions">
          {user ? (
            <>
              <li>Welcome, {user.username}</li>
              <Link to="/new-post">New post</Link>
              <li>
                <a href="" onClick={clickHandler}>
                  Logout
                </a>
              </li>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
            </>
          )}
        </ul>
      </ul>
    </nav>
  );
}
