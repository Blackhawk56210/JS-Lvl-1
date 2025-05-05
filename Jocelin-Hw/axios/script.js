const fetchBtn = document.getElementById("fetchBtn");
const fetchPair = document.getElementById("fetchPairBtn");
const fetchMultipleBtn = document.getElementById("fetchMultipleBtn");
const fetchGroupBtn = document.getElementById("fetchGroupBtn");
const searchInput = document.getElementById("searchInput");
const submitFilter = document.getElementById("submitFilter");
const userContainer = document.getElementById("userContainer");
const loader = document.getElementById("loader");
const themeToggle = document.getElementById("themeToggle");

let users = [];

fetchBtn.addEventListener("click", () => fetchUsers(1));
fetchPair.addEventListener("click", () => fetchUsers(2));
fetchMultipleBtn.addEventListener("click", () => fetchUsers(5));
fetchGroupBtn.addEventListener("click", () => fetchUsers(10));
searchInput.addEventListener("input", filterUsers);
// 
submitFilter.addEventListener("click", filterUsers);
// 
themeToggle.addEventListener("change", toggleTheme);

function fetchUsers(count) {
  users = [];
  userContainer.innerHTML = "";
  loader.style.display = "block";
  axios
    .get(`https://randomuser.me/api/?results=${count}`)
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
    console.clear();
}

function renderUsers(list) {
  userContainer.innerHTML = "";
  let totalAge = list.reduce((sum, user) => sum + user.dob.age, 0);
  let averageAge = totalAge / list.length;
  list.forEach((user) => {
    let gender = user.gender;
    console.log("Gender: ", gender);
  })
  list.forEach((user) => {
    let card = document.createElement("div");
    card.className = "user-card";
    card.innerHTML =` 
        <img src="${user.picture.medium}" alt="user-picture"/>
        <h3>Name: ${user.name.first} ${user.name.last}</h3>
        <p>Age: ${user.dob.age}</p>
        <p>Email: ${user.email}</p>
        <p>Located: ${user.location.city} ${user.location.country} </p>
        <p>Phone-number: ${user.phone}</p>
        `;
    userContainer.appendChild(card);
  });
  console.log("Average Age: ", averageAge);
}

// filters already rendered users
function filterUsers() {
  let term = searchInput.value.toLowerCase();
  const filterType = document.getElementById("filterSelect").value
  let filtered = users.filter((u) => {
    if (filterType === "name") {
    let fullName = `${u.name.first} || ${u.name.last}.toLowerCase()`;
    return fullName.include(term);
  } else if (filterType === "country") {
    let country = `${u.location.country}.toLowerCase()`;
    return country.include(term);
  } else {
    let fullName = `${u.name.first} ${u.name.last}.toLowerCase()`;
    let country = u.location.country.toLowerCase();
    return fullName.includes(term) || country.includes(term);
  }
  });
  console.log("filtered Users: ", filtered);
  renderUsers(filtered);
}

function toggleTheme() {
  document.body.classList.toggle("dark", themeToggle.checked);
  console.log("This is toggleTheme being called");
}