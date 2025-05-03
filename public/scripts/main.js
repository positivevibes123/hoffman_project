export async function fetchData(route = '', data={}, methodType) {
    const url = `http://localhost:3000${route}`
    const options = {
        method: methodType,
        headers: {
            'Content-Type': 'application/json'
        },
    }

    if (methodType == 'POST' || methodType == 'PUT') {
        options.body = JSON.stringify(data)
    }
    
    const response = await fetch(url, options)
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

    fetchData("/user/login", user, "POST")
    .then((data) => {
        if (!data.message) {
            setCurrentUser(data.insertId)
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
    })
}

export async function getProfile(userId) {
    try {
        const data = await fetchData(`/profile/getProfile?userId=${userId}`, "GET");
        if (!data.message) {
            return data[0]
        }
    } catch (err) {
        console.log(err.message)
        throw err
    }
}

export function updateProfile(profile) {
    fetchData("/profile/updateProfile", profile, "PUT")
    .then((data) => {
        if (!data.message) {
            console.log(data)
            console.log("Profile updated successfully")
        }
    })
    .catch((err) => {
        console.log(err.message)
    })
}

export function createPost(post) {
    fetchData("/userpost/createPost", post, "POST")
    .then((data) => {
        if (!data.message) {
            console.log(data)
            console.log("Post created successfully")
        }
    })
    .catch((err) => {
        console.log(err.message)
    })
}

export function getUserPosts(userid) {
    fetchData(`/userpost/${userid}`, "GET").then((data) => {
        if (!data.message) {
            console.log(data)
            console.log("Posts fetched successfully")

            if (data.length == 0) {
                console.log("No posts found")
            } else {
                // Loop through the posts and display them
            }
        }
    }).catch((err) => {
        console.log(err.message)
    })
}

function stringEmpty(word) {
    return word.length == 0
}

function setCurrentUser(user) {
    localStorage.setItem("user", JSON.stringify(user))
}
