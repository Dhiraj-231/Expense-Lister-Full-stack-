import React, { useEffect, useState } from "react";
import TransactionForm from "../components/TransactionForm.jsx";
import Record from "../components/Record.jsx";
import Cookies from "js-cookie";
import { Container } from "@mui/material";

export default function Home() {
  const [trans, setTrans] = useState([]);
  const [EditTrans, setEditTrans] = useState({});

  useEffect(() => {
    fetchTransctions();
  }, []);

  async function fetchTransctions() {
    const token=Cookies.get('token');
    console.log("hii")
    const res = await fetch(`http://localhost:8000/transaction`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("HII")
    const { data } = await res.json();
    setTrans(data);
  }
  return (
    <Container>
      <TransactionForm
        fetchTransctions={fetchTransctions}
        EditTrans={EditTrans}
      />
      <Record
        trans={trans}
        fetchTransctions={fetchTransctions}
        setEditTrans={setEditTrans}
      />
    </Container>
  );
}
