function fetchTodoList() {
  fetch("https://dummyjson.com/todos")
    .then((res) => res.json())
    .then((data) => {
      renderTodo(data);
    });
}
let count = 0;
function renderTodo(data) {
  const todoListRef = document.querySelector(".todoList");

  data.todos.forEach((todoObj) => {
    if (todoObj.completed == true) {
      count++;
    }
    createTodoList(todoListRef, todoObj.todo, todoObj.completed);
  });
  totalCompleted();
}

function createTodoList(todoListRef, text, completed) {
  const newliRef = document.createElement("li");
  newliRef.innerText = text;
  newliRef.style.textDecoration = completed ? "line-through" : "none";
  todoListRef.appendChild(newliRef);

  const checkboxRef = document.createElement("input");
  checkboxRef.type = "checkbox";
  checkboxRef.checked = completed;

  checkboxRef.addEventListener("change", function (e) {
    if (e.target.checked == true) {
      newliRef.style.textDecoration = "line-through";
      count++;
    } else {
      newliRef.style.textDecoration = "none";
      count--;
    }
    totalCompleted();
  });
  newliRef.prepend(checkboxRef);
}

function totalCompleted() {
  const completedRef = document.querySelector("#completed");
  completedRef.innerText = count;
}
fetchTodoList();
