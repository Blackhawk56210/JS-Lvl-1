function addTask() {
    let taskInput = document.getElementById("task");
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskInput.value);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
    taskInput.value = "";
}

function displayTasks() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    let tasks = JSON.parse(localStorage.getITEM("tasks")) || [];
    tasks,forEach((tasks, index) => {
        const li = document.createElement(li);
        li.innerHTM = `${task} <button onclick="removeTask(${index})">x</button>`;
        taskList.appendChild(li);
    });
};

function removeTask(index) {
    let tasks = JSON.parse(localStorage.getITEM("tasks")) || [];
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
    displayTasks();
}