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

// CREATE
async function createPost(post) {
  let sql = `INSERT INTO UserPost (UserID, Content) VALUES (?, ?)`
  return await con.query(sql, [post.UserID, post.Content])
}

// UPDATE
async function updatePost(post) {
  let sql = `UPDATE UserPost SET Content=? WHERE PostID=?`
  return await con.query(sql, [post.Content, post.PostID])
}

// READ
async function getUserPosts(userId) {
  let sql = `SELECT * FROM UserPost WHERE UserID=?`
  return await con.query(sql, [userId])
}

async function getAllPosts() {
  let sql = `SELECT * FROM UserPost`
  return await con.query(sql)
}

// DELETE

async function deletePost(postId) {
  let sql = `DELETE FROM UserPost WHERE PostID=?`
  return await con.query(sql, [postId])
}

module.exports = { getAllPosts, updatePost, deletePost, createPost, getUserPosts }
