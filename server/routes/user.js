const express = require("express");
const User = require("../models/user");
const router = express.Router();

router

  .get("/getUsers", async (req, res) => {
    try {
      const users = await User.getAllUsers();
      res.send(users);
    } catch (err) {
      res.status(401).send({ message: err.message });
    }
  })

  .post("/login", async (req, res) => {
    try {
      const user = await User.login(req.body);
      res.send({ ...user, password: undefined });
    } catch (err) {
      res.status(401).send({ message: err.message });
    }
  })

  .post("/signup", async (req, res) => {
    try {
      const user = await User.signUp(req.body);
      res.send({ ...user, password: undefined });
    } catch (err) {
      res.status(401).send({ message: err.message });
    }
  })

  .put("/updateUser", async (req, res) => {
    try {
      const user = await User.updateUser(req.body);
      res.send(user);
    } catch (err) {
      res.status(401).send({ message: err.message });
    }
  })

  .delete("/deleteUser/:id", async (req, res) => {
    try {
      const user = await User.deleteUser(req.params.id);
      res.send(user);
    } catch (err) {
      res.status(401).send({ message: err.message });
    }
  })

module.exports = router;
