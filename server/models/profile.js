const con = require("./db_connect");

async function createTable() {
  const sql = `CREATE TABLE IF NOT EXISTS Profile (
  ProfileID INT AUTO_INCREMENT PRIMARY KEY,
	UserID INT NOT NULL,
	Bio VARCHAR(255),
	JoinDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (UserID) REFERENCES User(UserID) ON DELETE CASCADE
 );`
 await con.query(sql)
}
createTable()

// CRUD Operations

// READ

async function getAllProfiles() {
  let sql = `SELECT * FROM Profile`
  return await con.query(sql)
}

async function getProfile(userId) {
	let sql = `SELECT * FROM Profile WHERE UserID=?`
	return await con.query(sql, [userId])
}

// CREATE

async function createProfile(profile) {
	//let sql = `INSERT INTO Profile (UserID, Bio) VALUES ${profile.UserID}, ${profile.Bio})`
	//return await con.query(sql)
	const sql = `INSERT INTO Profile (UserID, Bio) VALUES (?, ?)`;
	return await con.query(sql, [profile.UserID, profile.Bio]);
}

// UPDATE

async function updateProfile(profile) {
	let sql = `UPDATE Profile SET Bio=? WHERE UserID=?`
	return await con.query(sql, [profile.Bio, profile.UserID])
}

// DELETE

async function deleteProfile(userId) {
	let sql = `DELETE FROM Profile WHERE UserID=?`
	return await con.query(sql, [userId])
}

module.exports = { getAllProfiles, createProfile, getProfile, deleteProfile, updateProfile }