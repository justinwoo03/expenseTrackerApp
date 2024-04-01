import { Text, View } from "react-native";
import ExpensesOutput from "../components/expensesOutput/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";

export default function RecentExpenses() {
  const expensesContext = useContext(ExpensesContext);

  const recentExpenses = expensesContext.expenses.filter(expense => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo;
  });

  return <ExpensesOutput expenses={recentExpenses} timePeriod="Last 7 Days" fallBackText={"No recent expenses"}/>;
}
