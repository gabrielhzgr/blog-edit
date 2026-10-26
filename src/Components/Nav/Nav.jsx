import { Link, Form, useNavigate } from "react-router";
import "./Nav.css";
import useAuth from "../../hooks/useAuth";

export default function Nav() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

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
              <div className="user-info">
                <li>Welcome, {user.username}</li>
                <li>Role: {user.role}</li>
              </div>

              <li>
                <Link to="/new-post">New post</Link>
              </li>
              <li>
                <a href="" onClick={clickHandler}>
                  Logout
                </a>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </ul>
    </nav>
  );
}
