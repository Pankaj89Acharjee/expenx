const mongoose = require("mongoose");

const User = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    designation: { type: String },
    city: { type: String},
    mobile: { type: Number},
    //Below for showing in profile
    village: {type: String},
    pin: {type: Number},
    ps: {type: String},
    district: {type: String},
    image: {type: String},
    //For educational background
    graduation: {type: String},
    collegename: {type: String},
    university: {type: String},
    passingyear: {type: Number},
    //Professional Skills
    skilled: {type: String},
    programsknown: {type: String},
    yearofexperience: {type: Number},

},
    { collection: 'user-data' },

    { timestamps: true}

);

const model = mongoose.model("UserData", User)

module.exports = model