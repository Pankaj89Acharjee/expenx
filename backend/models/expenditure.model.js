const mongoose = require("mongoose");

const Expenditure = new mongoose.Schema({
    userid: {},
    exppurpose: { type: String, required:[true, "Purpose is required"]},
    amount: { type: Number, required:[true, "Amount is required"]},
    categories: { type: String, required:[true, "Category is required"] },
    dateofexp: { type:  Date, required:[true, "Date is required"]},
    totalAmount: { type: Number },
    

},

    { collection: 'expenditure-data' },

    { timestamps: true }
);

const Expenditureall = mongoose.model("Expenditureall", Expenditure)

module.exports = Expenditureall