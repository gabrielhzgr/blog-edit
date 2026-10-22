import Fallback from "../Fallback/Fallback.jsx";
import useAuth from "../../hooks/useAuth.jsx";
function IsAuthenticated({ children }) {
  const { user } = useAuth();
  if (!user) {
    return <Fallback />;
  } else {
    return <>{children}</>;
  }
}

export default IsAuthenticated;
