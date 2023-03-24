import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconButton, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";

export default function Record({ trans,fetchTransctions }) {
  const ClickHandler = async (_id) => {
    if (!window.confirm("Are you want to Delete")) return;
    const res = await fetch(`http://localhost:8000/transaction/${_id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      toast.error("Expense is Deleted", {
        position: toast.POSITION.TOP_CENTER,
      });
      fetchTransctions();
    }
  };
  return (
    <>
      <Typography variant="h6">List of Transaction</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Details</TableCell>
              <TableCell align="center">Amount</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trans.map((data) => (
              <TableRow key={data._id}>
                <TableCell align="center">{data.Detail}</TableCell>
                <TableCell align="center">{data.Amount}</TableCell>
                <TableCell align="center">{data.Date}</TableCell>
                <TableCell align="center">
                  <IconButton aria-label="edit" color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    color="warning"
                    onClick={() => ClickHandler(data._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
