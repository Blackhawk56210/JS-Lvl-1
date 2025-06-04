// TASK 1: Select button and container
// TASK 2: Add click event that calls fetchQuotes
// TASK 3: Create async function fetchQuotes with try/catch
// TASK 4: Loop 5 times and fetch from "https://api.kanye.rest/"
// TASK 5: Parse response and display quote inside a card
// TASK 6: Append the card to the container

const loadUserBtn = document.getElementById("loadUsersBtn");
const userContainer = document.getElementById("userContainer");

loadUserBtn.addEventListener("click", fetchQuotes);

async function fetchQuotes() {
    try {
        let result = [];
        for (let i=0; i < 5; i++) {
            userContainer.innerHTML = "";

            const response = await fetch("https://api.kanye.rest/");
            const data = await response.json();
            const quote = data.quote;
            result.push(quote);
            console.log(data);
        };
        
        for (let i=0; i < 5; i++) {
            const div = document.createElement("div");
            div.className - "soapBox";
            div.innerHTML = `
            <p>Quote: ${result[i]}</p>
            `;
            userContainer.appendChild(div);
        }
    } catch (error) {
        console.log("unable to fetch response", error)
    }
}