import { useState, useEffect } from "react";
import axios from "axios";
const App = () => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [allTransactions, setAllTransactions] = useState([]);
  const [newTransaction, setNewTransaction] = useState({
    exp_item: "",
    exp_date_time: "",
    exp_description: "",
  });
  const [balance, setBalance] = useState(0);

  const transactionInputHandler = (e) => {
    const { name, value } = e.target;
    setNewTransaction((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const HandleTransaction = async (e) => {
    e.preventDefault();
    try {
      await axios.post(BACKEND_URL + "newtransaction", newTransaction);
      alert("Expensed Recorded");
      setNewTransaction({
        exp_item: "",
        exp_date_time: "",
        exp_description: "",
      });
      GetTransactions();
    } catch (error) {
      console.log("api", error);
    }
  };

  const GetTransactions = async () => {
    try {
      const res = await axios.get(BACKEND_URL);
      const data = await res.data.data;
      setAllTransactions(data);
    } catch (error) {
      console.log("Getting ERROR FROM USE EFFECT", error);
    }
  };

  const balancer = () => {
    const totalBalance = allTransactions.reduce((total, transaction) => {
      const amount = parseFloat(transaction.exp_item.split(" ")[0]);
      return total + amount;
    }, 0);
    setBalance(totalBalance);
  };

  useEffect(() => {
    GetTransactions();
  }, []);

  useEffect(() => {
    if (allTransactions.length > 0) balancer();
  }, [allTransactions]);
  return (
    <>
      <main>
        <h1 className="title">Expense Tracker</h1>
        <h2 className="currency">
          $
          <span className="balance">
            {balance}
            <span className="cents">.00</span>
          </span>{" "}
        </h2>
        {/* Expense Adder form */}
        <form className="expense-form" onSubmit={HandleTransaction}>
          <div className="expense-form expense-top">
            <div className="inputs">
              <input
                spellCheck="false"
                type="text"
                onChange={transactionInputHandler}
                placeholder=""
                name="exp_item"
                autoComplete="off"
                className="exp-item"
                value={newTransaction.exp_item}
              />
              <label>Expense Item </label>
            </div>
            <input
              type="datetime-local"
              onChange={transactionInputHandler}
              name="exp_date_time"
              className="exp-datetime"
              spellCheck="false"
              required
              value={newTransaction.exp_date_time}
            />
          </div>
          <div className="inputs">
            <input
              type="text"
              onChange={transactionInputHandler}
              className="exp-description"
              name="exp_description"
              autoComplete="off"
              placeholder=""
              value={newTransaction.exp_description}
              spellCheck="false"
            />
            <label>Expense Description</label>
          </div>
          <p className="syntax">
            * For the Expense type like this
            <strong>"+amount itemName", "-amount ItemName"</strong>
          </p>
          <button className="btn" type="submit">
            Add new transaction
          </button>
        </form>
        <ul className="transactions">
          {allTransactions.length > 0 ? (
            allTransactions
              .slice()
              .reverse()
              .map((transac) => {
                return (
                  <li className="transaction" key={transac._id}>
                    <div className="transaction-details">
                      <p className="transaction-title">
                        {transac.exp_item.slice(
                          transac.exp_item.split(" ")[0].length
                        )}
                      </p>
                      <p className="transaction-description">
                        {transac.exp_description}
                      </p>
                    </div>
                    <div className="transaction-timeinfo">
                      <p
                        className={`transaction-amount ${
                          transac.exp_item.split(" ")[0] > 0 ? "profit" : "loss"
                        } `}
                      >
                        {transac.exp_item.split(" ")[0]}
                      </p>
                      <p className="transaction-time">
                        {transac.exp_date_time.slice(0, -5)}
                      </p>
                    </div>
                  </li>
                );
              })
          ) : (
            <p
              style={{
                textAlign: "center",
                fontSize: "1.5rem",
                paddingInline: "3rem",
              }}
            >
              HEY YOU HAVE NO EXPENSES?? THATS NOT RIGHT DOUBLE CHECK !!
            </p>
          )}
        </ul>
        <p className="credit"> A MERN Project Learned From David By Vishwa.K</p>
      </main>
    </>
  );
};
export default App;
