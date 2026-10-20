function Fallback({ message = "You are not authorized to see this resource" }) {
  return <div>{message}</div>;
}

export default Fallback;
