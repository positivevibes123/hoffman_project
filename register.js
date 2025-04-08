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
        errorSection.innerText = ""
        console.log(username)
    }

    const user = {
        username: username,
        password: password
    };

    console.log("User registered:", user);
}

function validString(word) {
    return word == ""
  }