const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    exp_item: {
      type: String,
      required: true,
    },
    exp_date_time: {
      type: Date,
      required: true,
    },
    exp_description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const TransactionModal = mongoose.model("Transactions", TransactionSchema);

module.exports = TransactionModal;
