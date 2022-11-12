const mongoose = require("mongoose");

const Income = new mongoose.Schema({    
    amount: { type: Number },
    month: {type: String},
    incomefrom: { type: String },
    totalIncome: { type: Number },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'model',
        
    },

},

    { collection: 'income-data' },

    { timestamps: true }
);

const Incomeall = mongoose.model("Incomeall", Income)

module.exports = Incomeall