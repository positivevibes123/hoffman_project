import {getProfile} from "./main.js"

window.onload = function() {
    let currentUserID = localStorage.getItem("user")
    console.log("Current user ID: " + currentUserID)
    let bioText = getProfile(currentUserID)

    console.log(bioText)

    document.getElementById("bio").innerHTML = bioText
}