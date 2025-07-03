import React, { useState } from "react";
import { useBudget } from "../context/BudgetContext";

const categories = [
  "Uncategorized",
  "Housing",
  "Groceries",
  "Transport",
  "Bills & Utilities",
  "Entertainment",
  "Shopping",
  "Health",
  "Freelance Income",
  "Salary",
  "Investments",
  "Other Income",
  "Savings",
];

export default function TransactionForm() {
  const { addTransaction } = useBudget();

  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    type: "expenses",
    category: "Other",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description || !formData.amount) return;

    addTransaction({
      description: formData.description,
      amount: parseFloat(formData.amount),
      type: formData.type,
      category: formData.category,
    });

    setFormData({
      description: "",
      amount: "",
      type: "expenses",
      category: "Other",
    });
  };

  return (
    <form
      className="bg-white rounded-xl shadow-lg p-6 mb-8 max-w-3xl mx-auto "
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Add New Transaction
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Description
          </label>
          <input
            id="description"
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm 
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            placeholder="Enter description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
        </div>

        {/* Amount */}
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Amount (€)
          </label>
          <input
            id="amount"
            type="number"
            step="0.01"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            placeholder="Enter amount"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
          />
        </div>

        {/* Type */}
        <div>
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Type
          </label>
          <select
            id="type"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            <option value="expenses">Expenses</option>
            <option value="income">Income</option>
          </select>
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Category
          </label>
          <select
            id="category"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            {categories.map((cat) => (
              <option value={cat} key={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="mt-8 w-full bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500
          text-white font-bold py-3 rounded-xl shadow-lg hover:from-pink-500 hover:to-indigo-500
          transition-colors flex justify-center items-center gap-2"
      >
        Add Transaction
      </button>
    </form>
  );
}
