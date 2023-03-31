import Transaction from "../models/transaction.js";

export const index = async (req, res) => {
  const transaction = await Transaction.find({user_id:req.user._id}).sort({ createdAt: -1 });
  res.json({ data: transaction });
};

export const create = async (req, res) => {
  const { Amount, Detail, Date } = req.body;
  const transaction = new Transaction({
    Amount,
    Detail,
    user_id:req.user._id,
    Category_id:req.body.Category_id,
    Date,
  });
  const data = await transaction.save();
  res.status(200).json({
    message: "Success",
  });
};

export const Remove = async (req, res) => {
  const transaction = await Transaction.findOneAndDelete({
    _id: req.params.id,
  });
  res.status(200).json({
    message: "Success",
  });
};

export const update = async (req, res) => {
  const { Amount, Detail, Date } = req.body;
  const transaction = await Transaction.findOneAndUpdate(
    { _id: req.params.id },
    {
      Amount,
      Detail,
      Date,
    }
  );
  res.status(200).json({
    message: "Success",
  });
};
