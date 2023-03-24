import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Typography } from "@mui/material";

export default function TransactionForm({ fetchTransctions }) {
  const [value, setValue] = React.useState(dayjs("2014-08-18T21:11:54"));
  const handleChange = (newValue) => {
    setForm({ ...form, Date: newValue });
  };
  const [form, setForm] = React.useState({
    Amount: 0,
    Detail: "",
    Date: "",
  });
  const SubmitHandler = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8000/transaction", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await res.json();
    if (res.ok) {
      toast.success("Data is saved", {
        position: toast.POSITION.TOP_CENTER,
      });
      setForm({
        Amount: 0,
        Detail: "",
        Date: "",
      });
      fetchTransctions();
    }
  };
  return (
    <Card sx={{ minWidth: 275, marginTop: 3 }}>
      <Typography variant="h6">Add New Transactions</Typography>
      <CardContent>
        <form onSubmit={SubmitHandler}>
          <TextField
            sx={{ marginRight: 5 }}
            id="outlined-basic"
            label="Amount"
            variant="outlined"
            size="small"
            value={form.Amount}
            onChange={(e) => setForm({ ...form, Amount: e.target.value })}
          />
          <TextField
            sx={{ marginRight: 5 }}
            id="outlined-basic"
            label="Detail"
            variant="outlined"
            size="small"
            value={form.Detail}
            onChange={(e) => setForm({ ...form, Detail: e.target.value })}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Date desktop"
              sx={{ marginRight: 5 }}
              inputFormat="MM/DD/YYYY"
              onChange={handleChange}
              renderInput={(params) => <TextField size="small" {...params} />}
            />
          </LocalizationProvider>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
