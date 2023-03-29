import Register from "./Pages/Register";
import App from "./App";
import Home from "./Pages/Home";
import TokenAuth from "./utils/TokenAuth.jsx";
import Login from "./Pages/Login";
import { createBrowserRouter } from "react-router-dom";
import Guest from "./utils/Guest";
export default createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <TokenAuth>
            <Home />
          </TokenAuth>
        ),
      },
      {
        path: "/register",
        element: (
          <Guest>
            <Register />
          </Guest>
        ),
      },
      {
        path: "/login",
        element: (
          <Guest>
            <Login />
          </Guest>
        ),
      },
    ],
  },
]);
