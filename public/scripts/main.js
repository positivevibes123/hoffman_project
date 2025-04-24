export async function fetchData(route = '', data={}, methodType) {
    const response = await fetch(`http://localhost:3000${route}`, {
        method: methodType,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    if (response.ok) {
        return await response.json()
    } else {
        throw await response.json()
    }
}

let loginForm = document.getElementById("loginForm")
if (loginForm) {
    loginForm.addEventListener("submit", login)
}

function login(event) {
    event.preventDefault(); // Prevent the default form submission
    let errorSection = document.getElementById("error")

    let user = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
    }

    if (stringEmpty(user.username)) {
        errorSection.innerText = "Username cannot be empty!"
    } else {
        errorSection.innerText = ""
    }

    fetchData("/users/login", user, "POST")
    .then((data) => {
        if (!data.message) {
            window.location.href = "index.html"
        }
    })
    .catch((err) => {
        let errorSection = document.getElementById("error")
        errorSection.innerText = err.message
    })
}

let registerForm = document.getElementById("registerForm")
if (registerForm) {
    registerForm.addEventListener("submit", register)
}

function register(event) {
  event.preventDefault(); // Prevent the default form submission

  let user = {
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
  };

  fetchData("/user/signup", user, "POST")
    .then((data) => {
      if (!data.message) {
        setCurrentUser(data.insertId)
        console.log(data.insertId)

        // Create a blank profile for the user
        let profile = {
            UserID: data.insertId,
            Bio: ""
        }
        
        // Try to create a blank profile in the database
        fetchData("/profile/createProfile", profile, "POST")
        .then((data) => {
            if (!data.message) {
                console.log("Profile created successfully")

                // If successful, redirect to the index page
                window.location.href = "index.html";
            }}).catch((err) => {
                console.log(err.message)
            })
      }
    })
    .catch((err) => {
      console.log(err.message)
    });
}

function stringEmpty(word) {
    return word.length == 0
}

function setCurrentUser(user) {
    localStorage.setItem("user", JSON.stringify(user))
}