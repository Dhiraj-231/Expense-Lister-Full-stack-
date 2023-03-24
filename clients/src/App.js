import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar.jsx"
import Record from "./components/Record.jsx";
import TransactionForm from "./components/TransactionForm.jsx";

export default function App() {

  const [trans, setTrans] = useState([]);

  useEffect(() => {
    fetchTransctions();
  }, []);

  async function fetchTransctions() {
    const res = await fetch("http://localhost:8000/transaction");
    const { data } = await res.json();
    setTrans(data);
  }

  return (
    <div>
       <NavBar/>
       <TransactionForm fetchTransctions={fetchTransctions}/>
      <br />
      <hr />
      <Record trans={trans}/>
    </div>
  );
}
