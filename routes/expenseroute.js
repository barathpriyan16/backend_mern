const express = require("express");
const router = express.Router();
const {
    createExpense,
    getExpenses,
    updateExpense,
    deleteExpense
} = require("../controllers/expensecontroller");

router.post("/expenses/:userId", createExpense);
router.get("/expenses/:userId", getExpenses);
router.put("/expenses/:id", updateExpense);
router.delete("/expenses/:id", deleteExpense);

module.exports = router;