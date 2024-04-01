import { FlatList, StyleSheet, View } from "react-native";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";
import { GlobalStyles } from "../../constants/styles";

const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'A pair of shoes',
        amount: 59.99,
        date: new Date('2024-03-29')
    },
    {
        id: 'e2',
        description: 'A pair of trousers',
        amount: 89.29,
        date: new Date('2024-01-23')
    },
    {
        id: 'e3',
        description: 'Some bananas',
        amount: 5.99,
        date: new Date('2022-06-15')
    },
    {
        id: 'e4',
        description: 'A book',
        amount: 14.49,
        date: new Date('2019-09-09')
    },
    {
        id: 'e5',
        description: 'Chipotle',
        amount: 12.29,
        date: new Date('2015-02-11')
    },
    {
        id: 'e6',
        description: 'Chipotle',
        amount: 12.29,
        date: new Date('2015-02-11')
    },
    {
        id: 'e7',
        description: 'Chipotle',
        amount: 12.29,
        date: new Date('2015-02-11')
    },
    {
        id: 'e8',
        description: 'Chipotle',
        amount: 12.29,
        date: new Date('2015-02-11')
    },
    {
        id: 'e9',
        description: 'Chipotle',
        amount: 12.29,
        date: new Date('2015-02-11')
    },
]

export default function ExpensesOutput({ expenses, timePeriod }) {

  return (
    <View style={styles.container}>
        <ExpensesSummary expenses={DUMMY_EXPENSES} timePeriod={timePeriod}/>
        <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 0,
        backgroundColor: GlobalStyles.colors.primary700,
    }
});