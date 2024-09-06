const express = require("express");
const {
  GetTransactions,
  Newtransaction,
} = require("../controllers/transaction.controller.js");

const router = express.Router();

// routes

router.get("/", GetTransactions);

router.post("/newtransaction", Newtransaction);

module.exports = router;
