import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete, Typography } from "@mui/material";
import Cookies from "js-cookie";
import { Box, height } from "@mui/system";
import { getUser } from "../stores/auth";
export default function CategoryForm({EditCategory }) {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const token = Cookies.get("token");
  const [form, setForm] = React.useState({
    label: "",
    icon: "",
  });
  const icons = ["user"];
    useEffect(() => {
      if (EditCategory._id !==undefined) {
        setForm(EditCategory);
      }
    }, [EditCategory]);

  const SubmitHandler = async (e) => {
    e.preventDefault();
    EditCategory._id === undefined ? Create() : Update();
  };

  function getCategoryName() {
    return (
     ""
    );
  }
  const Create = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/category`, {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (res.ok) {
      toast.success("Expense is Added to list", {
        position: toast.POSITION.TOP_CENTER,
      });
      setForm({
        label: "",
        icon: "",
      });
      reload(res);
    }
  };

  function reload(res) {
    const _user = {
      ...user,
      categories:[...user.categories,{...form}]
    };
    dispatch(getUser({ user:_user }));
  }
  const Update = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/category/${EditCategory._id}`,
      {
        method: "PATCH",
        body: JSON.stringify(form),
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.ok) {
      toast.success("Expense is Updated to list", {
        position: toast.POSITION.TOP_CENTER,
      });
      setForm({
        _id: "",
        Detail: "",
        Category_id: "",
        Date: "",
      });
    }
  };

  return (
    <Card sx={{ minWidth: 275, marginTop: 3 }}>
      <Typography variant="h6">Add New User</Typography>
      <CardContent>
        <Box component="form" onSubmit={SubmitHandler} sx={{ display: "flex" }}>
          <TextField
            sx={{ marginRight: 5 }}
            id="outlined-basic"
            label="Label"
            variant="outlined"
            size="small"
            value={form.label}
            onChange={(e) => setForm({ ...form, label: e.target.value })}
          />

          <Autocomplete
            value={getCategoryName()}
            onChange={(event, newValue) => {
              setForm({ ...form, icon: newValue });
            }}
            id="icons"
            options={icons}
            sx={{ width: 200, height: 50, marginRight: 5 }}
            renderInput={(params) => <TextField s {...params} label="Icon" />}
          />
          {EditCategory._id !== undefined && (
            <Button type="submit" variant="contained">
              Update
            </Button>
          )}
          {EditCategory._id === undefined && (
            <Button type="submit" variant="contained">
              Submit
            </Button>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
