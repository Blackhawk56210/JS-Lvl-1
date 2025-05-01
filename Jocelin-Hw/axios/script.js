// Task 1: Grab references to specific DOM elements by id
// 1.1 Declare const fetchBtn referencing the element with id "fetchBtn"
// 1.2 Declare const fetchMultipleBtn referencing the element with id "fetchMultipleBtn"
// 1.3 Declare const searchInput referencing the element with id "searchInput"
// 1.4 Declare const themeToggle referencing the element with id "themeToggle"
// 1.5 Declare const userContainer referencing the element with id "userContainer"
// 1.6 Declare const loader referencing the element with id "loader"
const fetchBtn = document.getElementById("fetchBtn");
const fetchMultipleBtn = document.getElementById("fetchMultipleBtn");
const searchInput = document.getElementById("searchInput");
const userContainer = document.getElementById("userContainer");
const loader = document.getElementById("loader");
const themeToggle = document.getElementById("themeToggle");

// Task 2: Initialize in-memory data storage
// 2.1 Declare let users as an empty array to hold fetched user objects

let users = [];

// Task 3: Attach event listeners
// 3.1 Add a click listener on fetchBtn that calls fetchUsers(1)
// 3.2 Add a click listener on fetchMultipleBtn that calls fetchUsers(5)
// 3.3 Add an input listener on searchInput that calls filterUsers()
// 3.4 Add a change listener on themeToggle that calls toggleTheme()

fetchBtn.addEventListener("click", () => fetchUsers(1));
fetchMultipleBtn.addEventListener("click", () => fetchUsers(5));
searchInput.addEventListener("input", filterUsers);
themeToggle.addEventListener("change", toggleTheme);

// Task 4: Implement fetchUsers(count) function
// 4.1 Reset users to an empty array
// 4.2 Clear userContainer content
// 4.3 Show loader element
// 4.4 Fetch random users from API using count parameter
//   4.4.1 On success: hide loader, update users array, call renderUsers(users)
//   4.4.2 On error: hide loader, display error in userContainer, log error
function fetchUsers(count) {
  users = [];
  userContainer.innerHTML = "";
  loader.style.display = "block";
  axios
    .get(`https://randomuser.me/api/?results=5&nat=US=${count}`)
    .then((response) => {
      loader.style.display = "none";
      users = response.data.results;
      renderUsers(users);
    })
    .catch((error) => {
      loader.style.display = "none";
      userContainer.innerHTML = "<p> Error fetching data</p>";
      console.error(error);
    });
}

// Task 5: Implement renderUsers(list) function
// 5.1 Clear userContainer content
// 5.2 For each user in list:
//   5.2.1 Create a card element
//   5.2.2 Assign it the class "user-card"
//   5.2.3 Populate with picture, name, age, email, location, phone
//   5.2.4 Append card to userContainer

function renderUsers(list) {
  userContainer.innerHTML = "";
  list.forEach((user) => {
    let card = document.createElement("div");
    card.className = "user-card";
    card.innerHTML = `
        <img src="${user.picture.medium}" alt="user-picture"/>
        <h3>Name: ${user.name.first} ${user.name.last}</h3>
        <p>Age: ${user.dob.age}</p>
        <p>Email: ${user.email}</p>
        <p>Located: ${user.location.city} ${user.location.country} </p>
        <p>Phone-number: ${user.phone}</p>
        `;
    userContainer.appendChild(card);
  });
  let totalAge = list.reduce((sum, user) => sum + user.dob.age, 0);
  let averageAge = totalAge / list.length;
  console.log("Average Age: ", averageAge);
  list.forEach((user) => {
    let gender = user.gender;
    console.log("Gender: ", gender);
  });
}
  /* Just another way I had done it
  list.forEach( (user, index) => {
    let gender = `${user.gender}`.toLowerCase();
    console.log(`Gender: ${index + 1}`, gender);
  })
  */

// Task 6: Implement filterUsers() function
// 6.1 Read and lowercase the value from searchInput
// 6.2 Filter users array based on term matching full name
// 6.3 Call renderUsers with filtered array
function filterUsers() {
  let term = searchInput.value.toLowerCase();
  let filtered = users.filter((u) => {
    let fullName = `${u.name.first} ${u.name.last}`.toLowerCase();
    let country = `${u.location.country}`.toLowerCase();
    return fullName.includes(term) || country.includes(term);
  });
  renderUsers(filtered);
}

// Task 7: Implement toggleTheme() function
// 7.1 Toggle the "dark" class on document.body based on themeToggle.checked

function toggleTheme() {
  document.body.classList.toggle("dark", themeToggle.checked);
  console.log("This is toggleTheme being called");
}
