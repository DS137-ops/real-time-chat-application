
const roomName = document.getElementById("room-name")
const userName = document.getElementById("users")

const socket = io()
const form = document.getElementById("chat-form")
const chat_messages = document.querySelector(".chat-messages")

const { username , room } = Qs.parse(location.search , {
    ignoreQueryPrefix:true
})
socket.emit("joinRoom" , {username , room})
socket.on("roomUsers" , ({room , users})=>{
    console.log(2)
    outputRoom(room)
    outputUsers(users)
})
socket.on("message" , message=>{
    console.log(message)
    outputMessage(message)
    chat_messages.scrollTop = chat_messages.scrollHeight
})
form.addEventListener("submit" , (e)=>{
    e.preventDefault()

    const msg = e.target.elements.msg.value
    socket.emit("chatMessage" , msg)
    e.target.elements.msg.value = ""
    e.target.elements.msg.focus()
})

function outputMessage(message){
    const div = document.createElement("div")
    div.classList.add("message")
    div.innerHTML =`<p class="meta">${message.username}<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${message.time}</span></p>
						<p class="text">
							${message.text}
						</p>`
    document.querySelector(".chat-messages").appendChild(div)
}

function outputRoom (room){
    console.log(3)
    roomName.innerText = room
}

function outputUsers (users){
    console.log(4)
    userName.innerHTML = `
    ${users.map(user=>`<li>${user.username}</li>`).join('')}
    `
}