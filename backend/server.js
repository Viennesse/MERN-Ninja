require('dotenv').config()
const express = require('express')
const mongoose = require("mongoose")
const workoutRoutes = require("./routes/workout")
const userRoutes = require("./routes/user")
// proxy field dodany w package.json na frontenddzie z adresem development server : http://localhost:4000

const app = express()

app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use("/api/workouts", workoutRoutes)
app.use("/api/user", userRoutes)


mongoose.connect(process.env.MONG_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('Connected to DB on port: ', process.env.PORT)
    })
  })
  .catch(err => console.log(err))









