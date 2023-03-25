import { Router } from "express";
import Transaction from "../models/transaction.js"
const router = Router();

router.get("/", async (req, res) => {
    const transaction = await Transaction.find({}).sort({ createdAt: -1 });
    res.json({ data: transaction });
});

router.post("/", async (req, res) => {
    const { Amount, Detail, Date } = req.body;
    const transaction = new Transaction({
        Amount,
        Detail,
        Date
    });
    const data = await transaction.save();
    res.status(200).json({
        message: "Success"
    })
});

router.delete("/:id",async(req,res)=>{
    const transaction= await Transaction.findOneAndDelete({_id:req.params.id});
    res.status(200).json({
        message:"Success"
    })
});

router.patch("/:id",async(req,res)=>{
    const {Amount,Detail,Date}=req.body;
   const transaction= await Transaction.findOneAndUpdate({_id:req.params.id},{
    Amount,
    Detail,
    Date
   });
   res.status(200).json({
    message:"Success",
   });
})

export default router;