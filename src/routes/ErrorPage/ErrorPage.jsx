import { Link } from "react-router";
export default function ErrorPage() {
  return (
    <div id="error">
      <h1>This route does not exist!</h1>
      <Link to="/">Click to go to home page</Link>
    </div>
  );
}
