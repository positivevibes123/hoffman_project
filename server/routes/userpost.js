const express = require("express")
const UserPost = require("../models/userpost")
const router = express.Router()

router

.get('/getUserPosts', async (req, res) => {
    try {
      const userPosts = await UserPost.getAllPosts()
      res.send(userPosts)
    } catch(err) {
      res.status(401).send({message: err.message})
    }
  })

  module.exports = router