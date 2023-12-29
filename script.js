function addTask() {

    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("taskList");

    if (taskInput.value.trim() !== "") {

        const li = document.createElement("li");

        const dateTime = new Date();
        const formattedDateTime = dateTime.toLocaleString();

        li.innerHTML = `
        <span class = "task-text">${taskInput.value}</span>
        <button class = "edit-btn"  onClick = "editTask(this)">Edit Task</button>
        <span class = "task-date">[${formattedDateTime}]</span>
        <button class = "delete-btn"  onClick = "deleteTask(this)">Delete Task</button>
        `;

        taskList.appendChild(li);
        saveTasksToLocaleStorage();
        taskInput.value = "";
    }
}

function deleteTask(btn) {

    const taskList = document.getElementById("taskList");
    const li = btn.parentNode;

    taskList.removeChild(li);

    saveTasksToLocaleStorage();
}

function editTask(btn) {
    const li = btn.parentNode;
    const taskTextElement = li.querySelector(".task-text");

    const updatedTaskText = prompt("Edit Task:", taskTextElement.innerText);

    if (updatedTaskText !== null && updatedTaskText.trim() !== "") {
        taskTextElement.innerText = updatedTaskText;
        saveTasksToLocaleStorage();
    }
}

function saveTasksToLocaleStorage() {

    const taskList = document.getElementById("taskList");

    const tasks = [];

    for (let i = 0; i< taskList.children.length; i++) {

        const taskText = taskList.children[i].querySelector(".task-text").innerText;
        const taskDate = taskList.children[i].querySelector(".task-date").innerText;

        const task = { text: taskText, date: taskDate };

        tasks.push(task);

    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {

    const taskList = document.getElementById("taskList");

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [] ;

    tasks.forEach(task => {
        const li = document.createElement("li");

        li.innerHTML = `
        <span class = "task-text">${task.text}</span>
        <button class = "edit-btn"  onClick = "editTask(this)">Edit Task</button>
        <span class = "task-date">[${task.date}]</span>
        <button class = "delete-btn"  onClick = "deleteTask(this)">Delete Task</button>
        `;

        taskList.appendChild(li);
    });
}

document.addEventListener("DOMContentLoaded", loadTasksFromLocalStorage);