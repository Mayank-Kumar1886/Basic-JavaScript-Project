const inputBox = document.getElementById("inputBox");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const errorMsg = document.getElementById("errorMsg");

let editTodo = null;
const addTodo = () => {
  const inputText = inputBox.value.trim();
  if (inputText === "") {
    errorMsg.innerText = "Enter Something....";
    return false;
  }
  if (addBtn.innerText === "Edit") {
    editTodo.target.previousElementSibling.innerHTML = inputText;
    editLocalTodos(inputText);
    addBtn.value = "Add";
    inputBox.value = "";
    editTodo = null;
  } else {
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.innerHTML = inputText;
    li.appendChild(p);

    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.classList.add("btn", "editBtn");
    li.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Remove";
    deleteBtn.classList.add("btn", "deleteBtn");
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
    inputBox.value = "";

    saveLocalTodo(inputText);
  }
};

const updateTodo = (event) => {
  if (event.target.innerHTML === "Remove") {
    todoList.removeChild(event.target.parentElement);
    deleteLocalTodos(event.target.parentElement);
  } else if (event.target.innerHTML === "Edit") {
    inputBox.value = event.target.previousElementSibling.innerHTML;
    inputBox.focus();
    addBtn.innerHTML = "Edit";
    editTodo = event;
  }
};

const saveLocalTodo = (todo) => {
  let todos;
  if (localStorage.getItem("Todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("Todos"));
  }
  todos.push(todo);
  localStorage.setItem("Todos", JSON.stringify(todos));
};

const getLocalTodos = () => {
  let todos;
  if (localStorage.getItem("Todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("Todos"));
    todos.forEach((todo) => {
      const li = document.createElement("li");
      const p = document.createElement("p");
      p.innerHTML = todo;
      li.appendChild(p);

      const editBtn = document.createElement("button");
      editBtn.innerText = "Edit";
      editBtn.classList.add("btn", "editBtn");
      li.appendChild(editBtn);

      const deleteBtn = document.createElement("button");
      deleteBtn.innerText = "Remove";
      deleteBtn.classList.add("btn", "deleteBtn");
      li.appendChild(deleteBtn);

      todoList.appendChild(li);
      inputBox.value = "";
    });
  }
};

const deleteLocalTodos = (todo)=>{
    let todos;
  if (localStorage.getItem("Todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("Todos"));
  }
  let todoText = todo.children[0].innerHTML;
  let todoIndex = todos.indexOf(todoText);
  todos.splice(todoIndex, 1);
  localStorage.setItem("Todos", JSON.stringify(todos));

}

const editLocalTodos = (todo)=>{
    let todos = JSON.parse(localStorage.getItem("Todos"));
    let todoIndex = todos.indexOf(todo);
    todos[todoIndex] = inputBox.value;
    localStorage.setItem("Todos", JSON.stringify(todos));
}

document.addEventListener('DOMContentLoaded', getLocalTodos)
addBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", updateTodo);
