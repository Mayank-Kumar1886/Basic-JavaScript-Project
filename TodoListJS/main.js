const inputBox = document.getElementById("inputBox");
const addBtn = document.getElementById("addBtn");
const listContainer = document.getElementById("list-container");
const errorMsg = document.querySelector(".errorMsg")



const addTodo = ()=>{
  if(inputBox.value === ""){
     errorMsg.innerText = "You must write something";
  }
  else{
    let li = document.createElement("li");
    li.innerHTML = `${inputBox.value} <i class="fa-solid fa-xmark"></i>`
    listContainer.appendChild(li);
  }
  inputBox.value ="";
}
listContainer.addEventListener('click',(event)=>{
  if(event.target.tagName === "I"){
    event.target.parentElement.remove();
  }
},false)
addBtn.addEventListener('click',addTodo);