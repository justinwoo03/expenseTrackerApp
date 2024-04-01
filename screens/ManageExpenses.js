import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/manageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/errorOverlay";

export default function ManageExpenses({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();

  const expensesContext = useContext(ExpensesContext);

  // params? returns if params is not null else null
  const editExpenseId = route.params?.expenseId;

  // converts to boolean based on truthy/falsy values
  const isEditing = !!editExpenseId;

  const selectedExpense = expensesContext.expenses.find(
    expense => expense.id === editExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    setIsSubmitting(true);
    try {
      await deleteExpense(editExpenseId);
      expensesContext.deleteExpense(editExpenseId);
      navigation.goBack();
    } catch (error) {
      setError("Could not delete expense - please try again!");
    }

    setIsSubmitting(false);
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    setIsSubmitting(true);

    try {
        if (isEditing) {
          expensesContext.updateExpense(editExpenseId, expenseData);
          // wait until finish to close modal
          await updateExpense(editExpenseId, expenseData);
        } else {
          const id = await storeExpense(expenseData);
          expensesContext.addExpense({ ...expenseData, id: id });
        }

        navigation.goBack();
    } catch (error) {
        setError("Could not save expense - please try again!");
    }

    setIsSubmitting(false);
  }

  function errorHandler() {
    setError(null);
  }

  if (error && !isSubmitting) {
    return <ErrorOverlay message={error} onConfirm={errorHandler}/>;
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onSubmit={confirmHandler}
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onCancel={cancelHandler}
        defaultValues={selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={24}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
