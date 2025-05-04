const express = require("express");
const Profile = require("../models/profile");
const router = express.Router();

router

  .get("/getProfiles", async (req, res) => {
    try {
      const profiles = await Profile.getAllProfiles();
      res.send(profiles);
    } catch (err) {
      res.status(401).send({ message: err.message });
    }
  })

  .get("/:id", async (req, res) => {
    try {
      const profile = await Profile.getProfile(req.params.id);
      res.send(profile);
    } catch (err) {
      res.status(401).send({ message: err.message });
    }
  })

  .post("/createProfile", async (req, res) => {
    try {
      const profile = await Profile.createProfile(req.body);
      res.send(profile);
    } catch (err) {
      res.status(401).send({ message: err.message });
    }
  })

  .put("/updateProfile", async (req, res) => {
    try {
      console.log(req.body)
      const profile = await Profile.updateProfile(req.body);
      res.send(profile);
    } catch (err) {
      res.status(401).send({ message: err.message });
    }
  })

module.exports = router;
