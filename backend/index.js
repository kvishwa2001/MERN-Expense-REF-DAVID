const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const ConnectMongoDB = require("./connection/mongoose.connect.js");
const router = require("./router/transaction.router.js");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3100;
// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

ConnectMongoDB(process.env.MONGO_DB_URI);

// routes
app.use("/", router);

app.listen(PORT, () => {
  console.log("Backend On " + PORT);
});
