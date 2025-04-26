const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("add");
const todoList = document.getElementById("todoList");

addButton.textContent = "Add Task";

function addTask() {
    const todo = taskInput.value;
    if (todo === "") return alert("Please enter an input");
    const li = document.createElement("li");
    li.textContent = todo;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove Task";
    removeButton.addEventListener("click", () => {
        todoList.removeChild(li);
    });

    li.appendChild(removeButton);
    todoList.appendChild(li);
}

addButton.addEventListener("click", addTask);

addTask();