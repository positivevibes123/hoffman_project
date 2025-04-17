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
async function getAllUsers() {
  let sql = `SELECT * FROM User`
  return await con.query(sql)
}

async function login(user) {
  let cUser = await userExists(user.Username)
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

// CREATE in CRUD - Registering a user

module.exports = { getAllUsers, login }
