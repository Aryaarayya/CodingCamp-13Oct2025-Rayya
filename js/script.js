let tasksDb = [];

function addTask() {
  const taskInput = document.getElementById("todo-input");
  const taskDate = document.getElementById("todo-date");

  if (validateInput(taskInput.value, taskDate.value)) {
    const newTask = {
      task: taskInput.value,
      date: taskDate.value,
    };
    tasksDb.push(newTask);
    renderTasks();
    taskInput.value = "";
    taskDate.value = "";
  }
}

function renderTasks() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  if (tasksDb.length === 0) {
    taskList.innerHTML = "<li>No tasks added yet</li>";
    return;
  }

  tasksDb.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.task} - ${item.date}`;

    li.addEventListener("click", () => {
      li.classList.toggle("completed");
    });

    const delBtn = document.createElement("button");
    delBtn.textContent = "×";
    delBtn.classList.add("delete-btn");
    delBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      deleteTask(index);
    });

    li.appendChild(delBtn);
    taskList.appendChild(li);
  });
}

function deleteTask(index) {
  tasksDb.splice(index, 1);
  renderTasks();
}

function deleteAllTasks() {
  if (confirm("Delete all tasks?")) {
    tasksDb = [];
    renderTasks();
  }
}

function filterTasks() {
  const dateFilter = document.getElementById("todo-date").value;
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  if (dateFilter === "") {
    alert("Please select a date to filter.");
    return;
  }

  const filtered = tasksDb.filter((t) => t.date === dateFilter);
  if (filtered.length === 0) {
    taskList.innerHTML = "<li>No tasks found for this date</li>";
    return;
  }

  filtered.forEach((t) => {
    const li = document.createElement("li");
    li.textContent = `${t.task} - ${t.date}`;
    taskList.appendChild(li);
  });
}

function validateInput(task, date) {
  if (task.trim() === "" || date.trim() === "") {
    alert("Please enter both task and due date.");
    return false;
  }
  return true;
}

document.getElementById("add-btn").addEventListener("click", addTask);
document.getElementById("filter-btn").addEventListener("click", filterTasks);
document
  .getElementById("delete-all-btn")
  .addEventListener("click", deleteAllTasks);
