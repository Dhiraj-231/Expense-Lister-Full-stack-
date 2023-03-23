import React, { useState } from 'react'

export default function App() {
  const [form,setForm]=useState({
    Amount:0,
    Detail:"",
    Date:""
  })
  const submitHandler= async(e)=>{
    e.preventDefault();
   const res=await fetch("http://localhost:4000/transaction",{
      method:"POST",
      body:form,
    });
    console.log(res)
  }
  return (
    <div>
      <form onSubmit={submitHandler}>
        <input placeholder='Enter the Transction amount'
          type="number"
          value={form.Amount}
          onChange={(e) => setForm({ ...form, Amount: e.target.value })}
        />
        <input placeholder='Enter the Transction Detail'
          type="text"
          value={form.Detail}
          onChange={(e) => setForm({ ...form, Detail: e.target.value })}
        />
        <input type="date"
          onChange={(e) => setForm({ ...form, Date: e.target.value })}
        />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
