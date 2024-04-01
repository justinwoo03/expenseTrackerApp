import axios from "axios";

const BACKEND_URL =
  "https://react-native-course-d73ad-default-rtdb.firebaseio.com/";

export async function storeExpense(expenseData) {
  // No need to generate Id, firebase  does that for us
  // added expenses.json at the end to target/create specific node in database
  const response = await axios.post(BACKEND_URL + "expenses.json", expenseData);

  // name holds the id 
  const id = response.data.name;

  return id;
}

export async function fetchExpenses() {
  const response = await axios.get(BACKEND_URL + "expenses.json");

  const expenses = [];

  console.log(response.data)

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };

    expenses.push(expenseObj);
  }

  return expenses;
}

export function updateExpense(id, expenseData) {
    // the url of an individual expense
    return axios.put(BACKEND_URL + `expenses/${id}.json`, expenseData);
}

export function deleteExpense(id) {
    return axios.delete(BACKEND_URL + `expenses/${id}.json`);
}
