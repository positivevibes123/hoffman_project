const con = require("./db_connect");

async function createTable() {
  const sql = `CREATE TABLE IF NOT EXISTS UserPost (
  PostID INT AUTO_INCREMENT PRIMARY KEY,
	UserID INT NOT NULL,
	Content VARCHAR(255) NOT NULL,
	DateCreated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (UserID) REFERENCES User(UserID) ON DELETE CASCADE
);`
  await con.query(sql)
}
createTable()

// CRUD Operations

async function getAllPosts() {
  let sql = `SELECT * FROM UserPost`
  return await con.query(sql)
}

module.exports = { getAllPosts }
