import React from "react";
import { EuroIcon } from "lucide-react";
import { useBudget } from "../context/BudgetContext";

export default function Balance() {
  const { balance, income, expenses } = useBudget();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3  gap-6 mb-10 px-4">
      {/* Balance Card */}
      <div
        className={`p-6 rounded-xl shadow-lg flex justify-between items-center
        bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white
        transition-transform hover:scale-105 hover:shadow-2xl`}
      >
        <div className="flex items-center gap-3">
          <EuroIcon size={36} className="text-white opacity-90" />
          <h2 className="text-xl font-semibold tracking-wide uppercase drop-shadow-md">
            Current Balance
          </h2>
        </div>
        <p
          className={`text-3xl font-extrabold tracking-tight
          ${balance >= 0 ? "text-green-400" : "text-red-400"}`}
        >
          €{balance.toFixed(2)}
        </p>
      </div>

      {/* Income Card */}
      <div
        className={`p-6 rounded-xl shadow-lg flex justify-between items-center
        bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white
        transition-transform hover:scale-105 hover:shadow-2xl`}
      >
        <div className="flex items-center gap-3">
          <EuroIcon size={36} className="text-white opacity-90" />
          <h2 className="text-xl font-semibold tracking-wide uppercase drop-shadow-md">
            Total Income
          </h2>
        </div>
        <p className="text-3xl font-extrabold tracking-tight text-white-200">
          €{income.toFixed(2)}
        </p>
      </div>

      {/* Expenses Card */}
      <div
        className={`p-6 rounded-xl shadow-lg flex justify-between items-center
        bg-gradient-to-r from-red-400 via-red-500 to-red-600 text-white
        transition-transform hover:scale-105 hover:shadow-2xl`}
      >
        <div className="flex items-center gap-3">
          <EuroIcon size={36} className="text-white opacity-90" />
          <h2 className="text-xl font-semibold tracking-wide uppercase drop-shadow-md">
            Expenses
          </h2>
        </div>
        <p className="text-3xl font-extrabold tracking-tight text-red-100">
          €{expenses.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
