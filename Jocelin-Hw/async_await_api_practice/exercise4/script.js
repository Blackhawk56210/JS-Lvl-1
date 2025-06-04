// TASK 1: Select button and container
// TASK 2: Add click listener to call fetchJokes
// TASK 3: Create async function fetchJokes
// TASK 4: Use try/catch for error handling
// TASK 5: Fetch from "https://official-joke-api.appspot.com/jokes/programming/ten"
// TASK 6: Convert response to JSON and loop through first 5 jokes
// TASK 7: Display setup and punchline in a card
// TASK 8: Append the cards to the container


const loadUserBtn = document.getElementById("loadUsersBtn");
const userContainer = document.getElementById("userContainer");

loadUserBtn.addEventListener("click", fetchJokes);
async function fetchJokes() {
    try {
        userContainer.innerHTML = ""

        const response = await fetch("https://official-joke-api.appspot.com/jokes/programming/ten");
        const data = await response.json();
        const jokes = data;
        console.log(data);
        
        for (let i = 0; i <5; i++) {
            const div = document.createElement("div");
            div.className = "jokeBox";
            div.innerHTML = `
            <p>Setup: ${jokes[i].setup}</p>
            <p>PunchLine: ${jokes[i].punchline}</p>
            `;
            userContainer.appendChild(div);
        }
    } catch (error) {
        console.log("no funny hahas available", error)
    }
}