import { FlatList, StyleSheet, Text, View } from "react-native";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";
import { GlobalStyles } from "../../constants/styles";

export default function ExpensesOutput({ expenses, timePeriod, fallBackText }) {

    let content = <Text style={styles.infoText}>{fallBackText}</Text>;

    if (expenses.length > 0)
        content = <ExpensesList expenses={expenses} />

  return (
    <View style={styles.container}>
        <ExpensesSummary expenses={expenses} timePeriod={timePeriod}/>
        {content}
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
    },
    infoText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 32,
    }
});