const taskSectionRef = document.querySelector(".task-section");
const addBtnRef = document.querySelector(".actions .add");
const modalRef = document.querySelector(".add-task-modal");
const textareaRef = document.querySelector(
  ".add-task-modal .left-section textarea"
);
const modalPrioritySelectionsRef = document.querySelectorAll(
  ".add-task-modal .right-section .box"
);
const disabledEditButtonRef = document.querySelector(".actions .remove");
const searchInputRef = document.querySelector(".search input");
const filteredBoxesRef = document.querySelectorAll(".filter .box");

const tasks = [
  { id: 1231421, title: "Task 1", priority: "p1" },
  { id: 456346, title: "Task 2", priority: "p2" },
  { id: 568567, title: "Task 3", priority: "p3" },
  { id: 243546, title: "Task 4", priority: "p4" },
  { id: 967567, title: "Task 5", priority: "p1" },
  { id: 345125, title: "Task 6", priority: "p1" },
];

function renderTasks(tasks) {
  taskSectionRef.innerHTML = "";
  tasks.forEach((task) => {
    createTask(task.title, task.priority, task.id);
  });
}

renderTasks(tasks);

function updateTask(ref, key, value) {
  const taskRef = ref.closest(".task");
  const taskId = taskRef.querySelector(".task-id").innerText;
  const selectedTask = tasks.find((task) => task.id == taskId);
  if (key) {
    selectedTask[key] = value;
  } else {
    const taskIdx = tasks.findIndex((task) => task.id == taskId);
    tasks.splice(taskIdx, 1);
  }
}

function createTask(title, priority, taskid) {
  const newTaskContent = `
        <div class="task-priority" data-priority="${priority}"></div>
        <div class="task-id">${taskid}</div>
        <div class="task-title">
          <span>${title}</span>
          <div class="task-remove"><i class="fa-solid fa-trash"></i></div>
        </div>
    `;

  const newtask = document.createElement("div");
  newtask.classList.add("task");
  newtask.innerHTML = newTaskContent;

  taskSectionRef.append(newtask);

  //change/update task priority
  // task node is used to implement
  newtask
    .querySelector(".task-priority")
    .addEventListener("click", function (e) {
      let newPriority = getNextPriority(e.target.dataset.priority);
      e.target.dataset.priority = newPriority;
      //Update task in tasks list data
      updateTask(e.target, "priority", newPriority);
      console.log(tasks);
    });

  //edit task title
  newtask
    .querySelector(".task-title span")
    .addEventListener("click", function (e) {
      if (!taskSectionRef.classList.contains("non-editable"))
        e.target.setAttribute("contentEditable", true);
      e.target.addEventListener("input", function (e) {
        updateTask(e.target, "title", e.target.innerText);
        console.log(tasks);
      });
    });

  //delete task
  newtask.querySelector(".task-remove").addEventListener("click", function (e) {
    e.target.closest(".task").remove();
    updateTask(e.target);
  });
}

addBtnRef.addEventListener("click", function () {
  toggleModal();
});

function toggleModal() {
  const isHidden = modalRef.classList.contains("hide");
  if (isHidden) {
    modalRef.classList.remove("hide");
  } else {
    modalRef.classList.add("hide");
  }
}

function addtask(id, priority, title) {
  task.push({
    id,
    title,
    priority,
  });
  renderTasks(tasks);
}

textareaRef.addEventListener("keyup", function (e) {
  if (e.key == "Enter") {
    const title = e.target.value;
    const selectedPriorityRef = document.querySelector(
      ".add-task-modal .right-section .box.selected"
    );
    const priority = selectedPriorityRef.dataset.priority;
    const taskid = Math.random();
    addtask(taskid, priority, title);
    toggleModal();
    e.target.value = "";
  }
});

modalPrioritySelectionsRef.forEach((priorityBoxRef) => {
  priorityBoxRef.addEventListener("click", function (e) {
    removeSelectedState(modalPrioritySelectionsRef);
    e.target.classList.add("selected");
  });
});

function removeSelectedState(boxesref) {
  boxesref.forEach((ref) => {
    ref.classList.remove("selected");
  });
}

function getNextPriority(currentPriority) {
  let priorityList = ["p1", "p2", "p3", "p4"];
  let newPriority =
    (priorityList.findIndex((item) => item === currentPriority) + 1) %
    priorityList.length;
  return priorityList[newPriority];
}

disabledEditButtonRef.addEventListener("click", function (e) {
  if (e.target.classList.contains("selected")) {
    e.target.classList.remove("selected");
    taskSectionRef.classList.add("non-editable");
    removeContentEditable();
  } else {
    e.target.classList.add("selected");
    taskSectionRef.classList.remove("non-editable");
  }
});

function removeContentEditable() {
  document.querySelectorAll(".task .task-title span").forEach((ref) => {
    ref.removeAttribute("contenteditable");
  });
}

//search
searchInputRef.addEventListener("keyup", function (e) {
  const searchedText = e.target.value;
  showSearchedTask(searchedText);
});

function showSearchedTask(searchText) {
  const filteredTasks = tasks.filter(
    (task) =>
      String(task.id).includes(searchText) || task.title.includes(searchText)
  );
  renderTasks(filteredTasks);
}

//Filter Tasks based on priority
filteredBoxesRef.forEach((ref) =>
  ref.addEventListener("click", function (e) {
    removeSelectedState(filteredBoxesRef);
    e.target.classList.add("selected");
    const selectedPriority = e.target.dataset.priority;
    showFilteredtask(selectedPriority);
  })
);

function showFilteredtask(selectedPriority) {
  const filteredTasks = tasks.filter(
    (task) => task.priority == selectedPriority
  );
  renderTasks(filteredTasks);
}
