const taskRef = document.querySelector(".task-section");
const addBtnRef = document.querySelector(".actions .add");
const modalRef = document.querySelector(".add-task-modal");
const textareaRef = document.querySelector(
  ".add-task-modal .left-section textarea"
);

function createTask(title) {
  const newTaskContent = `
        <div class="task-priority"></div>
        <div class="task-id">12345</div>
        <div class="task-title">
          <span>${title}</span>
          <div class="task-remove">x</div>
        </div>
    `;

  const newtask = document.createElement("div");
  newtask.classList.add("task");
  newtask.innerHTML = newTaskContent;

  taskRef.append(newtask);
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
textareaRef.addEventListener("keyup", function (e) {
  if (e.key == "Enter") {
    const title = e.target.value;
    createTask(title);
    toggleModal();
    e.target.value = "";
  }
});
