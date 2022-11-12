const mongoose = require("mongoose");

const User = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    designation: { type: String },
    city: { type: String},
    mobile: { type: Number}
},
    { collection: 'user-data' },

    { timestamps: true}

);

const model = mongoose.model("UserData", User)

module.exports = model