const users = []

class User {
  constructor(username, password) {
    this.username = username
    this.password = password
  }
}

// Very simple registration function. Later implement username checking...
export function registerUser(username, password) {
    const newUser = new User(username, password)
    users.push(newUser)
    console.log("User registered:", newUser)
    return newUser
}