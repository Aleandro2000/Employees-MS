const mongoose=require("mongoose");

const users=new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        default: ""
    }
});

module.exports=mongoose.model("users", users);