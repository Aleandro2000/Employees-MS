const mongoose=require("mongoose");

const employees=new mongoose.Schema({
    project_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "projects"
    },
    name: {
        type: String,
        required: true
    },
    adress: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    job_title: {
        type: String,
        required: true
    },
    hire_date: {
        type: Date,
        required: true
    },
    salary: {
        type: Number,
        required: true
    }
});

module.exports=mongoose.model("employees", employees);