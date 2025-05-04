const con = require("./db_connect");

async function createTable() {
  const sql = `CREATE TABLE IF NOT EXISTS User (
  UserID INT AUTO_INCREMENT PRIMARY KEY,
	Username VARCHAR(255) NOT NULL UNIQUE,
	Password varchar(255) NOT NULL
 );`
 await con.query(sql)
}
createTable()

// CRUD Operations

// CREATE

async function signUp(user) {
  let cUser = await userExists(user.username)
  if(cUser[0]) throw Error("Username already exists!")
  let sql = `
    INSERT INTO User (Username, Password)
    VALUES ("${user.username}", "${user.password}")
  `
  return await con.query(sql)
}

// READ

async function getAllUsers() {
  let sql = `SELECT * FROM User`
  return await con.query(sql)
}

async function login(user) {
  let cUser = await userExists(user.username)
  if(!cUser[0]) throw Error("Username does not exist!") 
    if(cUser[0].password != user.Password) throw Error("Password is incorrect!")
      
    return cUser[0]
}

async function userExists(username) {
  let sql = `
    SELECT * FROM User
    WHERE Username="${username}"
  `
  return await con.query(sql)
}

// UPDATE

async function updateUser(user) {
  let sql = `
    UPDATE User
    SET Username="${user.username}", Password="${user.password}"
    WHERE UserID=${user.UserID}
  `
  return await con.query(sql)
}

// DELETE

async function deleteUser(userId) {
  let sql = `
    DELETE FROM User
    WHERE UserID=${userId}
  `
  return await con.query(sql)
}

module.exports = { getAllUsers, updateUser, deleteUser, login, signUp }
