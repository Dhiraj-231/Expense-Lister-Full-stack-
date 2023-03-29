import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
export default function Guest({children}) {
  const Auth = useSelector((state) => state.auth);
  return !Auth.sAuthenticated ?children:<Navigate to="/" replace={true}/>
}
