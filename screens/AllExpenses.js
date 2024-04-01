import { View, Text } from "react-native";
import ExpensesOutput from "../components/expensesOutput/ExpensesOutput";

export default function AllExpenses() {
    return (
        <ExpensesOutput timePeriod={"Total"}/>
    );
}