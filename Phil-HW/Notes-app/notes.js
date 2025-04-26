// function to add task aka note;
function addNote() {
    let notesInput = document.getElementById("taskInput");
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push(notesInput.value);
    localStorage.setItem("notes", JSON.stringify(notes));
    displayNote();
    notesInput.value = "";
}


// displaytask()
function displayNote() {
    let notesList = document.getElementById("noteList");
    notesList.innerHTML = "";
    let notes = JSON.parse(localStorage.getItem("notes")) || [];    
    notes.forEach( (notes, index) => {
        let li = document.createElement("li");
        li.innerHTML = `${notes} <button onclick="removeNote(${index})"> Remove Note </button>`;
        notesList.appendChild(li);        
    });
    console.log(localStorage.getItem("notes")) || [];
}


// removeTask()
function removeNote(index) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    displayNote();
}

