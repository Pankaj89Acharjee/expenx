const mongoose = require("mongoose");

const Income = new mongoose.Schema({   
    userid:{} ,
    amount: { type: Number },
    dateselect: {type: Date},
    incomefrom: { type: String },
},

    { collection: 'income-data' },

    { timestamps: true }
);

const Incomeall = mongoose.model("Incomeall", Income)

module.exports = Incomeall