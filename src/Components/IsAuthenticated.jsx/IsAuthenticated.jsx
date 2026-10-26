import Fallback from "../Fallback/Fallback.jsx";
import useAuth from "../../hooks/useAuth.jsx";
function IsAuthenticated({ children }) {
  const { user } = useAuth();
  if (!user) {
    return <Fallback message="You are not authenticated" />;
  } else {
    return <>{children}</>;
  }
}

export default IsAuthenticated;
