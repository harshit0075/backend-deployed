const express=require("express")
const {NoteModel}=require("../models/note.model")
const {auth}=require("../middlewares/auth.middleware")

const noteRouter=express.Router()


noteRouter.use(auth)
noteRouter.post("/create",async(req,res)=>{
   try {
    const note= new NoteModel(req.body)
    await note.save()
    res.send({"msg":"New Note has been Added "})
   } catch (err) {
    res.send({"error":err})
   }
})


noteRouter.get("/",async(req,res)=>{
    try {
        const notes= await NoteModel.find()
       
        res.send(notes)
       } catch (err) {
        res.send({"error":err})
       }
})

noteRouter.patch("/update/:noteID",async(req,res)=>{
    const {noteID}=req.params
    const note=await NoteModel.findOne({_id:noteID})
    try {
        // if("userID from the req"!=="userId from the note body")
        if(req.body.userID!==note.userID)
        {
            res.send({"msg":"You are not Authorizied"})
        }else{

            await NoteModel.findByIdAndUpdate({_id:noteID},req.body)
            res.send({"msg":`Note with ID:${noteID} has been updated`})
        }
       } catch (err) {
        res.send({"error":err})
       }
})

noteRouter.delete("/delete/:noteID",async(req,res)=>{
    const {noteID}=req.params
    const note=await NoteModel.findOne({_id:noteID})
    try {
        if(req.body.userID!==note.userID)
        {
            res.send({"msg":"You are not Authorizied"})
        }else{

            await NoteModel.findByIdAndDelete({_id:noteID})
            res.send({"msg":`Note with ID:${noteID} has been Deleted`})
        }
       } catch (err) {
        res.send({"error":err})
       }
})


module.exports={
    noteRouter
}