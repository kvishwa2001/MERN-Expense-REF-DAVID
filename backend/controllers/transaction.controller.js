const TransactionModal = require("../models/transaction.model.js");

const GetTransactions = async (req, res) => {
  try {
    const AllTransaction = await TransactionModal.find({});
    res.status(200).json({ success: true, data: AllTransaction });
  } catch (error) {
    console.log("fetchingerror", error);
    res.status(500).json({
      success: false,
      message: "SERVER CRASHED WHILE FETCHING TRANSACTIONS",
    });
  }
};

const Newtransaction = async (req, res) => {
  try {
    const { exp_item, exp_date_time, exp_description } = req.body;
    console.log(exp_item, exp_date_time, exp_description);
    const createdTransaction = await TransactionModal.create({
      exp_item,
      exp_date_time,
      exp_description,
    });

    res.status(201).json({
      success: true,
      data: createdTransaction,
    });
  } catch (error) {
    console.log("Error creating transaction:", error);
    res.status(500).json({
      message: "SERVER CRASHED WHILE CREATING",
    });
  }
};

module.exports = { GetTransactions, Newtransaction };
