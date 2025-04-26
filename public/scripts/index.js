import {getProfile} from "./main.js"

document.getElementById("editBio").onclick = function() {
    let form = document.getElementById("formDiv")
    form.style.display = "block"
}

// Update profile
document.getElementById("bioForm").onsubmit = function(event) {
    event.preventDefault()

    let profile = {
        UserID: localStorage.getItem("user"),
        Bio: ''
    }

    console.log("Form submitted")
}

window.onload = async function() {
    let currentUserID = localStorage.getItem("user")
    console.log("Current user ID: " + currentUserID)
    
    try {
        let profile = await getProfile(currentUserID)

        document.getElementById("bio").innerHTML = profile.Bio
    } catch (err) {
        console.log(err.message)
    }
}