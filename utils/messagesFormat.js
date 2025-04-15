const time = require("moment")

function messageFormat(username , text){
    return {
        username,
        text,
        time:time().format("h:mm a")
    }
}
module.exports = messageFormat;