import {getProfile, updateProfile, createPost, getUserPosts} from "./main.js"

document.getElementById("editBio").onclick = function() {
    let bioForm = document.getElementById("bioFormDiv")
    bioForm.style.display = "block"
}

document.getElementById("editPost").onclick = function() {
    let postForm = document.getElementById("postFormDiv")
    postForm.style.display = "block"
}

// Update profile
document.getElementById("bioForm").onsubmit = function(event) {
    event.preventDefault()

    let profile = {
        UserID: localStorage.getItem("user"),
        Bio: document.getElementById("bioInput").value
    }

    updateProfile(profile)

    console.log("Form submitted")
}

document.getElementById("postForm").onsubmit = function(event) {
    event.preventDefault()

    let post = {
        UserID: localStorage.getItem("user"),
        Post: document.getElementById("postInput").value
    }

    createPost(post)

    console.log("Post submitted")
}

document.getElementById("register").onclick = function() { 
    localStorage.removeItem("user")
}

window.onload = async function() {
    let currentUserID = localStorage.getItem("user")
    console.log("Current user ID: " + currentUserID)
    
    let profile = await getProfile(currentUserID)
    console.log("Profile: ", profile)

    if (profile) {
        document.getElementById("bio").innerHTML = profile.Bio
        document.getElementById("joinDate").innerHTML = "Join Date: " + profile.JoinDate.split("T")[0];
    }

    let userposts = await getUserPosts(localStorage.getItem("user"))
    console.log("User post list: ", userposts)
    
    if (userposts && userposts.length > 0) {
        let result = ""
        userposts.forEach(function(post) {
            result += "<li>" + post.Content + "</li>"
        })
        document.getElementById("postList").innerHTML = result
    }
}
