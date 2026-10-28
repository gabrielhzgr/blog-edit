import {
  Link,
  useRouteError,
  isRouteErrorResponse,
  NavLink,
} from "react-router";
import Error from "../../Components/Error/Error.jsx";
export default function ErrorPage() {
  const error = useRouteError();
  return <Error error={error} />;
}
