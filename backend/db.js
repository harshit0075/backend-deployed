const mongoose=require("mongoose")

const connection=mongoose.connect("mongodb://localhost:27017/google_notes")

module.exports={
    connection
}