const express = require("express")
const app = express()
const http = require("http")
const socketio = require("socket.io")
const path = require("path")
const messageFormat = require("./utils/messagesFormat")
const {newUser  , getCurrentUser , userLeave , getRoomUsers} = require("./utils/users")

const server = http.createServer(app)
const io = socketio(server)
require("dotenv").config()
app.use(express.static(path.join(__dirname,"public")))
//I arrived in video to time 23:08
io.on("connection" , socket=>{
    socket.on("joinRoom" , ({username , room})=>{
        
        const user = newUser(socket.id , username , room)
        socket.join(user.room)
        socket.emit("message" , messageFormat("chat bot" , "welcome to chat"))
        socket.broadcast.to(user.room).emit("message", messageFormat("chat bot" , `${user.username} join`))
        io.to(user.room).emit("roomUsers" , {
           
            room : user.room,
            users:getRoomUsers(user.room)
        })
    })
    socket.on("disconnect" , ()=>{
        const user = userLeave(socket.id)
        if(user){
        io.to(user.room).emit("message" , messageFormat("chat bot" ,`${user.username}  left` ))
        io.to(user.room).emit("roomUsers" , {
            room : user.room,
            users:getRoomUsers(user.room)
        })
        }
    })
    socket.on("chatMessage" , (msg)=>{
        const user = getCurrentUser(socket.id)

        io.to(user.room).emit("message" , messageFormat("USER" , msg))
    })
})
server.listen(process.env.PORT , ()=>{
    console.log(`server is running on ${process.env.PORT}`)
})