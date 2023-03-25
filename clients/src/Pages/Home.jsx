import React, { useEffect, useState } from "react";
import TransactionForm from "../components/TransactionForm.jsx";
import Record from "../components/Record.jsx";
import { Container } from "@mui/material";

export default function Home() {
  const [trans, setTrans] = useState([]);
  const [EditTrans, setEditTrans] = useState({});

  useEffect(() => {
    fetchTransctions();
  }, []);

  async function fetchTransctions() {
    const res = await fetch("http://localhost:8000/transaction");
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
