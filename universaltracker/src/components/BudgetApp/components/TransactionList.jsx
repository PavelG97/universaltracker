import React from "react";
import { Trash2 } from "lucide-react";
import { useBudget } from "../context/BudgetContext";

export default function TransactionList() {
  const { transactions, deleteTransaction } = useBudget();

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
      <table className="w-full min-w-[600px]">
        <thead className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-white uppercase text-sm tracking-wider font-semibold">
          <tr>
            {["Date", "Description", "Category", "Amount", "Action"].map((heading) => (
              <th key={heading} className="px-6 py-3 text-left select-none">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan={5} className="py-8 text-center text-gray-400 italic">
                No transactions found.
              </td>
            </tr>
          ) : (
            transactions.map((transaction) => (
              <tr
                key={transaction.id}
                className="hover:bg-gray-50 transition-colors duration-200 cursor-default"
              >
                <td className="px-6 py-4 whitespace-nowrap text-gray-700 font-medium">
                  {new Date(transaction.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                  {transaction.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600 italic">
                  {transaction.category}
                </td>
                <td
                  className={`px-6 py-4 whitespace-nowrap font-semibold ${
                    transaction.type === "expenses"
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {transaction.type === "income" ? "+" : "-"}€{transaction.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => deleteTransaction(transaction.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    aria-label="Delete transaction"
                    title="Delete transaction"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
