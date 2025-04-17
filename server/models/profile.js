const con = require("./db_connect");

async function createTable() {
  const sql = `CREATE TABLE IF NOT EXISTS Profile (
  ProfileID INT AUTO_INCREMENT PRIMARY KEY,
	UserID INT NOT NULL,
	PostID INT NOT NULL,
	Bio VARCHAR(255),
	JoinDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (UserID) REFERENCES User(UserID) ON DELETE CASCADE
 );`
 await con.query(sql)
}
createTable()

// CRUD Operations
async function getAllProfiles() {
  let sql = `SELECT * FROM Profile`
  return await con.query(sql)
}

module.exports = { getAllProfiles }