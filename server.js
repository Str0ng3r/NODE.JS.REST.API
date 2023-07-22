import app from "./app.js"
import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()
const {DB_HOST,PORT} = process.env
mongoose.connect(DB_HOST)
.then (
  app.listen(PORT, () => {
    console.log("Database connection successful")
    console.log("Server running. Use our API on port: 5000")
  })
)
.catch(error => {
  console.log(error.message)
  process.exit(1)
}
)
