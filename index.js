// specify we want to use express
const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())

const userRoutes = require("./server/routes/user")
const userPostRoutes = require("./server/routes/userpost")
const profileRoutes = require("./server/routes/profile")

app.use("/user", userRoutes)
app.use("/userpost", userPostRoutes)
app.use("/profile", profileRoutes)

//CORS middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");  
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");  
  next();
});

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server started on port ${PORT}!!`))