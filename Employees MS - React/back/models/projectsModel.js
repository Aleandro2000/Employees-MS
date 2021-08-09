const mongoose=require("mongoose");

const projects=mongoose.Schema({
    project_name: {
        type: String,
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    planned_end_date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    project_code: {
        type: String,
        require: true
    }
});

module.exports=mongoose.model("projects",projects);