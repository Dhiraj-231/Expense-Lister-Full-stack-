import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container, IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import { getUser } from "../stores/auth";
import CategoryForm from "../components/CategoryForm";
export default function Category() {
  const token = Cookies.get("token");
  const [editCategory,setEditCategory]=React.useState({})
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  let FormatDate = (date) => {
    return dayjs(date).format("DD MMM ,YY");
  };

  function setEditCatgory(category) {
    setEditCategory(category)
  }
  const Remove = async (_id) => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/category/${_id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.ok) {
      const _user = {
        ...user,
        categories: user.categories.filter((category) => category._id != _id),
      };
      dispatch(getUser({ user: _user }));
      toast.success("Deleted successfully", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  return (
    <Container>
      <CategoryForm EditCategory={editCategory}/>
      <Typography variant="h6">List of Categories</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Label</TableCell>
              <TableCell align="center">Icon</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user.categories.map((data) => (
              <TableRow key={data._id}>
                <TableCell align="center">{data.label}</TableCell>
                <TableCell align="center">{data.icon}</TableCell>
                <TableCell align="center">
                  <IconButton
                    aria-label="edit"
                    onClick={(e) => setEditCatgory(e.target.value)}
                    color="primary"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    color="warning"
                    onClick={() => Remove(data._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
