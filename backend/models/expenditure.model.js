const mongoose = require("mongoose");

const Expenditure = new mongoose.Schema({
    // income: { 
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Incomeall'
    // },
    income: { type: Number }, //Later on change to the above by un-commenting out
    exppurpose: { type: String },
    amount: { type: Number },
    month: {type: String},
    dateofexp: { type:  Date },
    totalAmount: { type: Number },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'model',
        
    },

},

    { collection: 'expenditure-data' },

    { timestamps: true }
);

const Expenditureall = mongoose.model("Expenditureall", Expenditure)

module.exports = Expenditureall