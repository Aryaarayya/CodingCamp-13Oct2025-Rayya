/// Database Simulation
let tasksDb = [];

/// Add Task Function
function addTask() {
    const taskInput = document.getElementById('todo-input');
    const taskDate = document.getElementById('todo-date');

    if (validateInput(taskInput.value, taskDate.value)) {
        const newTask = {
            task: taskInput.value,
            date: taskDate.value
        };

        // Add to "database"
        tasksDb.push(newTask);

        // Render ulang tampilan daftar task
        renderTasks();

        // Reset input
        taskInput.value = '';
        taskDate.value = '';
    }
}

/// Render Tasks Function
function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    if (tasksDb.length === 0) {
        taskList.innerHTML = '<li>No tasks added yet</li>';
        return;
    }

    tasksDb.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.task} - ${item.date}`;
        li.classList.add('task-item');

        // Klik untuk tandai selesai
        li.addEventListener('click', () => {
            li.classList.toggle('completed');
        });

        // Tombol hapus per task
        const delBtn = document.createElement('button');
        delBtn.textContent = '×';
        delBtn.classList.add('delete-btn');
        delBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // supaya tidak ikut toggle
            deleteTask(index);
        });

        li.appendChild(delBtn);
        taskList.appendChild(li);
    });
}

/// Delete All Tasks Function
function deleteAllTasks() {
    if (confirm('Are you sure you want to delete all tasks?')) {
        tasksDb = [];
        renderTasks();
    }
}

/// Delete Single Task Function
function deleteTask(index) {
    tasksDb.splice(index, 1);
    renderTasks();
}

/// Filter Tasks Function
function filterTasks() {
    const dateFilter = document.getElementById('todo-date').value;
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    if (dateFilter === '') {
        alert('Please select a date to filter.');
        return;
    }

    const filteredTasks = tasksDb.filter(task => task.date === dateFilter);

    if (filteredTasks.length === 0) {
        taskList.innerHTML = '<li>No tasks found for this date</li>';
        return;
    }

    filteredTasks.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = `${item.task} - ${item.date}`;
        taskList.appendChild(li);
    });
}

/// Validate Input Function
function validateInput(task, date) {
    if (task.trim() === '' || date.trim() === '') {
        alert('Please enter both task and due date.');
        return false;
    }
    return true;
}

/// Event Listeners
document.getElementById('add-btn').addEventListener('click', addTask);
document.getElementById('delete-all-btn').addEventListener('click', deleteAllTasks);
document.getElementById('filter-btn').addEventListener('click', filterTasks);
