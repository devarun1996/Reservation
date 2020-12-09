const mongoose = require("mongoose");

const reserveSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 2,
        trim: true
    },
    people:{
        type: Number,
        required: true
    },
    time:{
        type: String,
        required: true
    },
    ownerId:{
        type: mongoose.Types.ObjectId,
        required: true
    }
});

module.exports = mongoose.model("reservations", reserveSchema);