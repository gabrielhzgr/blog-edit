import "./Error.css";
function Error({ error }) {
  let title, message, stack;

  if (error instanceof Response) {
    title = `${error.status}: ${error.name}`;
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
