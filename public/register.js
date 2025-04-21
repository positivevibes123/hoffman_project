import { fetchData } from "./fetch.js"
const form = document.getElementById("form");
form.addEventListener("submit", onSubmit);

// Attempt to register with the inputted credentials
function onSubmit(event) {
  event.preventDefault(); // Prevent the default form submission

  let user = {
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
  };

  fetchData("/user/signup", user, "POST")
    .then((data) => {
      if (!data.message) {
        window.location.href = "index.html";
      }
    })
    .catch((err) => {
      let errorSection = document.getElementById("error");
      errorSection.innerText = err.message;
    });
}
