import {registerUser} from "../server/models/user.js"

const form = document.getElementById("form")
form.addEventListener("submit", onSubmit)

function onSubmit(event) {
    event.preventDefault(); // Prevent the default form submission

    let errorSection = document.getElementById("error")

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (validString(username)) {
        errorSection.innerText = "Username cannot be blank!"
    } else {
        // Swap this out for checking for a user in the future
        registerUser(username, password)
        
        errorSection.innerText = ""
    }
}

function validString(word) {
    return word == ""
  }