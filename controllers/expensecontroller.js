const Expense = require("../models/expense");

exports.createExpense = async (req, res) => {
    try {
        const { amount, category, description, date } = req.body;
        const { userId } = req.params;
        
        const expense = await Expense.create({
            userId,
            amount,
            category,
            description,
            date
        });
        
        res.status(201).json({ 
            message: "Expense created successfully", 
            expense 
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.getExpenses = async (req, res) => {
    try {
        const { userId } = req.params;
        const expenses = await Expense.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.updateExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const { amount, category, description, date } = req.body;
        
        const expense = await Expense.findByIdAndUpdate(
            id,
            { amount, category, description, date },
            { new: true }
        );
        
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }
        
        res.status(200).json({ 
            message: "Expense updated successfully", 
            expense 
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const expense = await Expense.findByIdAndDelete(id);
        
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }
        
        res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};