import {getProfile} from "./main.js"

window.onload = async function() {  
    try {
        let profile = await getProfile(currentUserID)
        console.log(profile)

        document.getElementById("bio").innerHTML = profile
    } catch (err) {
        console.log(err.message)
    }
}