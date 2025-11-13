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
      amount: amount
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
      <li data-id=${expenses.id}>${expenses.id}</li>
      <li>${expenses.title}</li>
      <li><span>$</span>${expenses.amount}</li>
      <li>
        <button type="button" class="btn_edit">Edit</button>
        <button type="button" class="btn_delete">Delete</button>
      </li>
    </ul>
  `;
  tableRecordElement.insertAdjacentHTML("beforeend", html);
  
  const btnEdit = document.querySelectorAll('.btn_edit');
  const btnDelete = document.querySelectorAll(".btn_delete");
  const content_id = document.querySelectorAll(".tbl_tr_content");

  btnEdit.forEach((btnedit)=>{
    btnedit.addEventListener('click',(event)=>{
        let id;
        content_id.forEach((ids)=>{
            id = ids.firstElementChild.dataset.id;
        })
        let element = event.target.parentElement.parentElement;
        element.remove();

        let expenses = itemList.filter((item)=>{
            return item.id === parseInt(id);
        })
        expenseDescriptionElement.value = expenses[0].title;
        expenseAmountElement.value = expenses[0].amount;

        let temp_list = itemList.filter((item)=>{
            return item.id !== id;
        })
        itemList = temp_list;
    })
  })
  btnDelete.forEach((btnDel)=>{
    btnDel.addEventListener('click',(event)=>{
        let id;
        content_id.forEach((ids)=>{
            id = ids.firstElementChild.dataset.id;
        })
        let element = event.target.parentElement.parentElement;
        element.remove();
        let temp_list = itemList.filter((item)=>{
            return item.id !== id;
        })
        itemList = temp_list;
        showBalance();
    })
  })

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
