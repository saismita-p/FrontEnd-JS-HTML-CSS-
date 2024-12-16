const taskRef = document.querySelector(".task-section");
const addBtnRef = document.querySelector(".actions .add");
const modalRef = document.querySelector(".add-task-modal");
const textareaRef = document.querySelector(
  ".add-task-modal .left-section textarea"
);
const modalPrioritySelectionsRef = document.querySelectorAll(
  ".add-task-modal .right-section .box"
);
const disabledEditButtonRef = document.querySelector(".actions .remove");
const taskSectionRef = document.querySelector(".task-section");
const searchInputRef = document.querySelector(".search input");

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

  taskRef.append(newtask);

  //Add event listener to change task priority using task node
  newtask
    .querySelector(".task-priority")
    .addEventListener("click", function (e) {
      let newPriority = getNextPriority(e.target.dataset.priority);
      e.target.dataset.priority = newPriority;
    });

  //Make task title editable
  newtask
    .querySelector(".task-title span")
    .addEventListener("click", function (e) {
      if (!taskSectionRef.classList.contains("non-editable"))
        e.target.setAttribute("contentEditable", true);
    });

  //Add event listener to delete icons on task
  newtask.querySelector(".task-remove").addEventListener("click", function (e) {
    e.target.closest(".task").remove();
  });
}

createTask("Task1", "p1", 1545);
createTask("Task2", "p2", 654889);

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
textareaRef.addEventListener("keyup", function (e) {
  if (e.key == "Enter") {
    const title = e.target.value;
    const selectedPriorityRef = document.querySelector(
      ".add-task-modal .right-section .box.selected"
    );
    const priority = selectedPriorityRef.dataset.priority;
    const taskid = Math.random();
    createTask(title, priority, taskid);
    toggleModal();
    e.target.value = "";
  }
});

modalPrioritySelectionsRef.forEach((priorityBoxRef) => {
  priorityBoxRef.addEventListener("click", function (e) {
    removeSelectedState();
    e.target.classList.add("selected");
  });
});

function removeSelectedState() {
  modalPrioritySelectionsRef.forEach((priorityBoxRef) => {
    priorityBoxRef.classList.remove("selected");
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
  const taskRefs = document.querySelectorAll(".task");
  taskRefs.forEach((taskRef) => {
    const taskId = taskRef.querySelector(".task-id");
    const taskTitle = taskRef.querySelector(".task-title span");
    const task = taskRef.closest(".task");
    if (
      taskId.innerText.includes(searchText) ||
      taskTitle.innerText.includes(searchText)
    ) {
      task.style.display = "flex";
    } else {
      task.style.display = "none";
    }
  });
}
