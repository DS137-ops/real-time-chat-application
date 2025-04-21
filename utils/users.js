const users = []

function newUser(id , username , room){
    const user = {
        id,
        username,
        room
    }
    users.push(user)
    return user
}

function getCurrentUser(id){
    return users.find(users => users.id === id)
}

function userLeave(id){
    const index = users.findIndex(user => user.id === id)
    console.log("index" , index)
    if(index!== -1){
        return users.splice(index , 1)[0]
    }
}
function getRoomUsers (room){
    console.log(1)
    return users.filter(user => user.room === room)
}



    module.exports = {newUser , getCurrentUser ,userLeave ,getRoomUsers }