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
    if (error.status == 400) {
      title = "You did not provide the right input";
    } else if (error.status == 401) {
      title = "You need to authenticated to see this";
    } else if (error.status == 403) {
      title = "You are not authorized to use this resource";
    } else if (error.status == 404) {
      title = "This route does not exist";
    }
    message = error.statusText;
  } else if (error instanceof Error) {
    title = "An unexpected error occurred";
    message = error.message;
  }

  return (
    <div id="error">
      <h1>{title}</h1>
      <p>{message}</p>
      <Link to={-1}>Go back</Link>
      <NavLink></NavLink>
    </div>
  );
}
