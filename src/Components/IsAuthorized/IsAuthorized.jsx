import Fallback from "../Fallback/Fallback.jsx";
import useAuth from "../../hooks/useAuth.jsx";
function IsAuthorized({ children }) {
  const { user } = useAuth();
  if (user.role == "EDITOR") {
    return <>{children}</>;
  } else {
    return <Fallback message="You are not authorized" />;
  }
}

export default IsAuthorized;
