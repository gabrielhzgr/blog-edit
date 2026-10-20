import { AuthContext } from "../Providers/AuthProvider";
import { useContext } from "react";
export default function useAuth() {
  return useContext(AuthContext);
}
