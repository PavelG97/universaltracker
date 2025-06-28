import { createContext, useContext, useEffect, useReducer } from "react";

const BudgetContext = createContext();
const loadInitialState = () => {
  const savedTransaction = localStorage.getItem("budget_transactions");
  return {
    transactions: savedTransaction ? JSON.parse(savedTransaction) : [],
  };
};

const initialState = loadInitialState();

function budgetReducer(state, action) {
  switch (action.type) {
    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
    case "DELETE_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction.id !== action.payload
        ),
      };
    default:
      return state;
  }
}

export function BudgetProvider({ children }) {
  const [state, dispatch] = useReducer(budgetReducer, initialState);

  useEffect(() => {
    localStorage.setItem(
      "budget_transactions",
      JSON.stringify(state.transactions)
    );
  }, [state.transactions]);
  //ADD transaction
  const addTransaction = (transaction) => {
    dispatch({
      type: "ADD_TRANSACTION",
      payload: {
        ...transaction,
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
      },
    });
  };
  //DELETE transaktion
  const deleteTransaction = (id) => {
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id,
    });
  };

  //balance

  const balance = state.transactions.reduce((acc, transaction) => {
    return transaction.type === "income"
      ? acc + transaction.amount
      : acc - transaction.amount;
  }, 0);

  // income
  const income = state.transactions.reduce((acc, transaction) => {
    return transaction.type === "income" ? acc + transaction.amount : acc;
  }, 0);

  //expenses

  const expenses = state.transactions
    .filter((t) => t.type === "expenses")
    .reduce((acc, curr) => acc + curr.amount,0);

  return (
    <BudgetContext.Provider
      value={{
        transactions: state.transactions,
        addTransaction,
        deleteTransaction,
        balance,
        income,
        expenses,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
}

export function useBudget() {
  const context = useContext(BudgetContext);
  if (context === undefined) {
    throw new Error("useBudget must be used within a BudgetProvider");
  }
  return context;
}
