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
    const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
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
