const errorMessageElement1 = document.querySelector(".error_message1");
const errorMessageElement2 = document.querySelector(".error_message2");
const budgetInputElement = document.querySelector(".budget_input");
const expenseDescriptionElement = document.querySelector(".expense_input");
const expenseAmountElement = document.querySelector(".expense_amount");
const tableRecordElement = document.querySelector(".tbl_data");
const budgetCardElement = document.querySelector(".budget_card");
const expensesCardElement = document.querySelector(".expenses_card");
const balanceCardElement = document.querySelector(".balance_card");

let itemList = [];
let itemId = 1;

const btnEvents = () => {
  const btnBudgetCalculate = document.querySelector("#btn_budget");
  const btnExpensesCalculate = document.querySelector("#btn_expenses");

  btnBudgetCalculate.addEventListener("click", (event) => {
    event.preventDefault();
    budgetFunction();
  });

  btnExpensesCalculate.addEventListener("click", (event) => {
    event.preventDefault();
    expensesFunction();
  });
};

document.addEventListener("DOMContentLoaded", btnEvents);

const expensesFunction = () => {
  let expensesDescriptionValue = expenseDescriptionElement.value.trim();
  let expensesAmountValue = expenseAmountElement.value.trim();

  if (expensesDescriptionValue === "" || expensesAmountValue === "") {
    errorMessageElement2.style.display = "flex";
    setTimeout(() => {
      errorMessageElement2.style.display = "none";
    }, 3000);
  } else {
    let amount = parseInt(expensesAmountValue);

    let expenses = {
      id: itemId,
      title: expensesDescriptionValue,
      amount: amount,
    };

    itemId++;
    itemList.push(expenses);

    addExpenses(expenses);
    expenseDescriptionElement.value = "";
    expenseAmountElement.value = "";
    showBalance();
  }
};

const addExpenses = (expenses) => {
  const html = `
    <ul class="tbl_tr_content">
      <li data-id="${expenses.id}">${expenses.id}</li>
      <li>${expenses.title}</li>
      <li><span>$</span>${expenses.amount}</li>
      <li>
        <button type="button" class="btn_edit">Edit</button>
        <button type="button" class="btn_delete">Delete</button>
      </li>
    </ul>
  `;
  tableRecordElement.insertAdjacentHTML("beforeend", html);

  const btnEdits = document.querySelectorAll(".btn_edit");
  const btnDeletes = document.querySelectorAll(".btn_delete");

  // EDIT
  btnEdits.forEach((btn) => {
    btn.onclick = (event) => {
      const row = event.target.parentElement.parentElement;
      const id = parseInt(row.firstElementChild.dataset.id);

      const expense = itemList.find((item) => item.id === id);

      expenseDescriptionElement.value = expense.title;
      expenseAmountElement.value = expense.amount;

      itemList = itemList.filter((item) => item.id !== id);
      row.remove();
      showBalance();
    };
  });

  // DELETE
  btnDeletes.forEach((btn) => {
    btn.onclick = (event) => {
      const row = event.target.parentElement.parentElement;
      const id = parseInt(row.firstElementChild.dataset.id);

      itemList = itemList.filter((item) => item.id !== id);
      row.remove();
      showBalance();
    };
  });
};

const budgetFunction = () => {
  const budgetValue = budgetInputElement.value.trim();

  if (budgetValue === "" || isNaN(budgetValue) || parseInt(budgetValue) <= 0) {
    errorMessageElement1.style.display = "flex";
    setTimeout(() => {
      errorMessageElement1.style.display = "none";
    }, 3000);
  } else {
    budgetCardElement.textContent = parseInt(budgetValue);
    budgetInputElement.value = "";
    showBalance();
  }
};

const showBalance = () => {
  const expenses = totalExpenses();
  const budgetValue = parseInt(budgetCardElement.textContent) || 0;
  const total = budgetValue - expenses;
  balanceCardElement.textContent = total;
};

const totalExpenses = () => {
  const total = itemList.reduce((sum, item) => sum + item.amount, 0);
  expensesCardElement.textContent = total;
  return total;
};
