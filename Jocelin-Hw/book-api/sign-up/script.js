const credentials = document.getElementById("submitLogin");
const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const age = document.getElementById("age");
const email = document.getElementById("email-input");
const password = document.getElementById("password-input");
const passwordRepeat = document.getElementById("password-repeat");
const form = document.getElementById("signInForm");



form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (password.value !== passwordRepeat.value) {
        alert("Passwords don't match");
        return;
    }
    const signIn = {
        email: email.value,
        password: password.value
    }
    const userData = {
        firstName: firstName.value,
        lastName: lastName.value,
        age: age.value,
    }
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("signIn", JSON.stringify(signIn));
    const allStoredData = {
  ...storedSignIn,
  ...storedUserData
  };

console.log("All User Info:", allStoredData);
})

