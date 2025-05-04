import {getProfile, updateProfile, createPost, getUserPosts, deletePost} from "./main.js"

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
        Content: document.getElementById("postInput").value
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
            result += `<li>
                ${post.Content}
                ${post.DateCreated.split("T")[0]}
                <button class="delete-btn" data-postid="${post.PostID}">Delete</button>
            </li>`
        })
        document.getElementById("postList").innerHTML = result

        // Add event listeners to delete buttons
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.onclick = async function() {
                const postId = this.getAttribute('data-postid')
                await deletePost(postId)
                // Refresh the post list
                const updatedPosts = await getUserPosts(localStorage.getItem("user"))
                if (updatedPosts && updatedPosts.length > 0) {
                    let newResult = ""
                    updatedPosts.forEach(function(post) {
                        newResult += `<li>
                            ${post.Content}
                            <button class="delete-btn" data-postid="${post.PostID}">Delete</button>
                        </li>`
                    })
                    document.getElementById("postList").innerHTML = newResult
                    
                    // Reattach event listeners to new buttons
                    document.querySelectorAll('.delete-btn').forEach(btn => {
                        btn.onclick = button.onclick
                    })
                } else {
                    document.getElementById("postList").innerHTML = ""
                }
            }
        })
    }
}
