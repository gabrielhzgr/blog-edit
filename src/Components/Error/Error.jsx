import "./Error.css";
function Error({ error }) {
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
    } else {
      title = "Bad request";
    }
    title = `${error.status}: ${title}`;
    message = error.statusText;
  } else if (error instanceof Error) {
    title = "An unexpected error occurred";
    message = error.message;
  } else {
    title = "Error";
    message = error.toString();
  }
  return (
    <div className="error">
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}
export default Error;
