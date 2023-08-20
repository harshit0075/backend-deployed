const express=require("express")
const {connection}=require("./db")
const {userRouter}=require("./routes/user.routes")
const {noteRouter}=require("./routes/notes.routes")
const cors=require("cors")

const app=express()
app.use(cors()) //allow cross origin requests
app.use(express.json())
app.use("/users",userRouter)
app.use("/notes",noteRouter)

 
// app.get("/",(req,res)=>{
//     res.send("Home Page")
// })

app.listen(3535,async()=>{

    try {
        await connection
        console.log("Connected to db");
        console.log("Server is running at port 3535");
    } catch (error) {
        console.log("something went wrong");
    }
})