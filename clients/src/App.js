import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./components/AppBar.js"

export default function App() {
  const [form, setForm] = useState({
    Amount: 0,
    Detail: "",
    Date: "",
  });
  const [transaction, setTransaction] = useState([]);

  useEffect(() => {
    fetchTransctions();
  }, []);

  async function fetchTransctions() {
    const res = await fetch("http://localhost:8000/transaction");
    const { data } = await res.json();
    setTransaction(data);
  }

  const submitHandler = async (e) => {
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
    <div>
       <NavBar/>
      <form onSubmit={submitHandler}>
        <input
          placeholder="Enter the Transction amount"
          type="number"
          value={form.Amount}
          onChange={(e) => setForm({ ...form, Amount: e.target.value })}
        />
        <input
          placeholder="Enter the Transction Detail"
          type="text"
          value={form.Detail}
          onChange={(e) => setForm({ ...form, Detail: e.target.value })}
        />
        <input
          type="date"
          onChange={(e) => setForm({ ...form, Date: e.target.value })}
        />
        <button type="submit">Submit</button>
      </form>
      <br />
      <hr />
      <section>
        <table>
          <thead>
            <th>Amount</th>
            <th>Detail</th>
            <th>Date</th>
          </thead>
          <tbody>
                {transaction.map((trax) => (
                  <tr key={trax._id}>
                    <td>{trax.Amount}</td>
                    <td>{trax.Detail}</td>
                    <td>{trax.Date}</td>
                  </tr>))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
