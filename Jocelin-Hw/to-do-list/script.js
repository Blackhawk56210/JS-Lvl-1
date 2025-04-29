function addTask() {
    let taskInput = document.getElementById("inputField");
    let task = JSON.parse(localStorage.getItem("tasks")) || [];
    task.push(taskInput.value);
    localStorage.setItem("tasks", JSON.stringify(task));
    displayTask();
    taskInput.value = "";
  }
  
  function displayTask() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((tasks, index) => {
      const li = document.createElement("li");
      li.innerHTML = `${tasks} <button onclick="removeTask(${index})">remove</button>`
      taskList.appendChild(li);
    })
  }
  
  function removeTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTask();
  }