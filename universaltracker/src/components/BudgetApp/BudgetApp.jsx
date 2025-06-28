import React from "react";
import { Wallet } from "lucide-react";
import Balance from "./components/Balance";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import { BudgetProvider } from "./context/BudgetContext";
import BudgetPieChart from "./components/BudgetPieChart";
import ChatBot from "../Chatbot/ChatBot";

function BudgetApp() {
  return (
    <BudgetProvider>
      <div className="min-h-screen bg-zinc-300">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Wallet size={32} className="text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">
              Money Managment
            </h1>
          </div>
          <ChatBot />
          <Balance />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-6">
            <div>
              <TransactionForm />
            </div>
            <div>
              <BudgetPieChart />
            </div>
          </div>

          <TransactionList />
        </div>
      </div>
    </BudgetProvider>
  );
}

export default BudgetApp;
