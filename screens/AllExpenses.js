import { View, Text } from "react-native";
import ExpensesOutput from "../components/expensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { useContext } from "react";

export default function AllExpenses() {

    const expensesContext = useContext(ExpensesContext);

    return (
        <ExpensesOutput expenses={expensesContext.expenses} timePeriod={"Total"} fallBackText={"No expenses found"}/>
    );
}