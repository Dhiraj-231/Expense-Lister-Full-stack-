import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../stores/auth.js";

export default function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const _logout = () => {
    Cookies.remove("token");
    dispatch(logout());
    toast.info("Logout Successfully ", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
    navigate("/login");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <NavLink to="/" style={{ textDecoration: "none", color: "white" }}>
              Expense Tracker
            </NavLink>
          </Typography>
          {isAuthenticated && (
            <>
              <NavLink
                to="/category"
                style={{ textDecoration: "none", color: "white" }}
              >
                <Button color="inherit">Categories</Button>
              </NavLink>
              <Button onClick={_logout} color="inherit">
                Logout
              </Button>
            </>
          )}
          {!isAuthenticated && (
            <>
              <NavLink
                to="/register"
                style={{ textDecoration: "none", color: "white" }}
              >
                <Button color="inherit">Register</Button>
              </NavLink>
              <NavLink
                to="/login"
                style={{ textDecoration: "none", color: "white" }}
              >
                <Button color="inherit">Login</Button>
              </NavLink>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
