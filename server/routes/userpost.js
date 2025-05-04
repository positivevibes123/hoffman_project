const express = require("express")
const UserPost = require("../models/userpost")
const router = express.Router()

router

.get('/', async (req, res) => {
    try {
      const userPosts = await UserPost.getAllPosts()
      res.send(userPosts)
    } catch(err) {
      res.status(401).send({message: err.message})
    }
  })

  .get('/:id', async (req, res) => {
    try {
      const userPost = await UserPost.getUserPosts(req.params.id)
      res.send(userPost)
    } catch(err) {
      res.status(401).send({message: err.message})
    }
  })

.post('/createPost', async (req, res) => {
    try {
      const userPost = await UserPost.createPost(req.body)
      res.send(userPost)
    } catch(err) {
      res.status(401).send({message: err.message})
    }
})

.put('/updatePost', async (req, res) => {
    try {
      const userPost = await UserPost.updatePost(req.body)
      res.send(userPost)
    } catch(err) {
      res.status(401).send({message: err.message})
    }
})

.delete('/deletePost/:id', async (req, res) => {
    try {
      const userPost = await UserPost.deletePost(req.params.id)
      res.send(userPost)
    } catch(err) {
      res.status(401).send({message: err.message})
    }
})


  module.exports = router