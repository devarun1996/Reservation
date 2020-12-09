const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 2,
        trim: true
    },
    userName:{
        type: String,
        required: true,
        minlength: 2,
        trim: true
    },
    password:{
        type: String,
        required: true,
        minlength: 4
    },
    restaurant:{
        type: String,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model("owners", ownerSchema);