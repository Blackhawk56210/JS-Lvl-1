// TASK 1: Select the button and container
// TASK 2: Add event listener to call fetchPokemon
// TASK 3: Create async function fetchPokemon with try/catch
// TASK 4: Use a loop from 1 to 5 to fetch data from "https://pokeapi.co/api/v2/pokemon/{id}"
// TASK 5: Convert each response to JSON
// TASK 6: Display image and name of each Pokémon
// TASK 7: Create and append a card for each Pokémon

const loadUserBtn = document.getElementById("loadUsersBtn");
const userContainer = document.getElementById("userContainer");

loadUserBtn.addEventListener("click", fetchPokemon);

const pokemonAmount = 20;

async function fetchPokemon() {
    try {
        let result = [];
        for (let i = 1; i < pokemonAmount; i++) {
            userContainer.innerHTML = "";
            
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
            const data = await response.json();
            const pokemon = data;
            result.push(pokemon);
            console.log(data);
        }
        for (let i = 0; i < pokemonAmount; i++) {
            const div = document.createElement("div");
            div.className = "pokeBall";
            div.innerHTML = `
            <img src="${result[i].sprites.front_default}"/>
            <p>Name: ${result[i].name}</p>
            `;
            userContainer.appendChild(div)
            console.log(pokemonAmount);
        }
    } catch (error) {
        console.log("no Pokemon", error)
    }
}
