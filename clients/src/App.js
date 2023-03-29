import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, redirect } from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import { getUser } from "./stores/auth.js";
import Cookies from "js-cookie";
export default function App() {
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  async function fetchUser() {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/Auth`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      const user = await res.json();
      dispatch(getUser(user));
    }
  }
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}
