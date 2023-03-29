import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function TokenAuth({ children }) {
  const Auth = useSelector((state) => state.auth);
  return Auth.isAuthenticated ?children:<Navigate to="/login"/>
}
