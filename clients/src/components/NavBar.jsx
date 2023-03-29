import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export default function NavBar() {
  const navigate=useNavigate();
  const logout=()=>{
    Cookies.remove("token");
    toast.info("Logout Successfully ",{
      position:toast.POSITION.BOTTOM_RIGHT
    });
    navigate("/login");
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <NavLink to="/" style={{ textDecoration: "none", color: "white" }}>
              Expense Tracker
            </NavLink>
          </Typography>
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
            <Button onClick={logout} color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
