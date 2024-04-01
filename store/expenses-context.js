import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2024-03-29"),
  },
  {
    id: "e2",
    description: "A pair of trousers",
    amount: 89.29,
    date: new Date("2024-01-23"),
  },
  {
    id: "e3",
    description: "Some bananas",
    amount: 5.99,
    date: new Date("2022-06-15"),
  },
  {
    id: "e4",
    description: "A book",
    amount: 14.49,
    date: new Date("2019-09-09"),
  },
  {
    id: "e5",
    description: "Chipotle",
    amount: 12.29,
    date: new Date("2015-02-11"),
  },
  {
    id: "e6",
    description: "Chipotle",
    amount: 12.29,
    date: new Date("2015-02-11"),
  },
  {
    id: "e7",
    description: "Chipotle",
    amount: 12.29,
    date: new Date("2015-02-11"),
  },
  {
    id: "e8",
    description: "Chipotle",
    amount: 12.29,
    date: new Date("2015-02-11"),
  },
  {
    id: "e9",
    description: "Chipotle",
    amount: 12.29,
    date: new Date("2015-02-11"),
  },
  {
    id: "e10",
    description: "Pokemon Cards",
    amount: 125.39,
    date: new Date("2014-03-31"),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: id => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date.toString() + Math.random().toString();

      // return a new, deep-copied array
      return [{ ...action.payload, id: id }, ...state];

    case "UPDATE":
      const updateableExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id);
      const updateableExpense = state[updateableExpenseIndex];

      // action.payload.data overwrites existing data in updateableExpense, but keep Id
      const updatedItem = {...updateableExpense, ...action.payload.data};
      const updatedExpenses = [...state];
      updatedExpenses[updateableExpenseIndex] = updatedItem;
      
      return updatedExpenses;

    case "DELETE":
        return state.filter((expense) => expense.id !== action.payload);

    default:
      return state;
  }
}

export default function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }


  return <ExpensesContext.Provider>{children}</ExpensesContext.Provider>;
}
