import {
  Link,
  useRouteError,
  isRouteErrorResponse,
  NavLink,
} from "react-router";
export default function ErrorPage() {
  const error = useRouteError();
  let title, message, stack;

  if (error instanceof Response) {
    title = error.name;
    message = error.statusText;
  } else if (error instanceof Error) {
    title = "An unexpected error occurred";
    message = error.message;
  }

  return (
    <div id="error">
      <h1>{title}</h1>
      <p>{message}</p>
      <Link to=".">Go back</Link>
      <NavLink></NavLink>
    </div>
  );
}
