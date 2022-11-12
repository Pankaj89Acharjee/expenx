const express = require("express");
const PORT = 5050;
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const jwt = require("jsonwebtoken");
const User = require("./models/user.model");
const Expense = require("./models/expenditure.model");
const Income = require("./models/income.model");
const bcrypt = require("bcryptjs");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
//const DB_CONNECTION = process.env.MONGODBCONNECTION;


const connectionStr = "mongodb+srv://pankaj:pankaj@cluster0.b79bjsq.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(connectionStr, {
    useNewUrlParser: true
})
    .then(() => {
        console.log("Database Connection established");
    }).catch((err) => {
        console.log("Error:-", err.message);
    })
app.listen(PORT, () => {
    console.log("Server on port", PORT);
})

app.get("/", (req, res) => {
    res.send("Hi backend");
})

app.post("/api/register", async (req, res) => {
    console.log(req.body);
    try {
        const newpassword = await bcrypt.hash(req.body.password, 10)
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: newpassword,
            designation: req.body.designation,
            city : req.body.city,
            mobile : req.body.mobile
        })
        res.send({ status: "ok" });
        console.log(user);
    } catch (error) {
        console.log("Error in Registering user", error.message);
        res.send({ status: "Error", error: "Duplicate email" });
    }
})

app.post("/api/newexpense", async (req, res) => {
    try {
        const expense = new Expense({
            income: req.body.income,
            exppurpose: req.body.exppurpose,
            amount: req.body.amount,
            dateofexp: req.body.dateofexp,
            totalAmount: req.body.totalAmount,
            user: req.body.email,
        })
        const createdExpense = await expense.save()
        console.log("Created Expense!", createdExpense);
        res.send({status: 'ok', message: 'New Expenditure Created', expense: createdExpense });

    } catch (error) {
        console.log("Error in inserting new expense", error.message);
        res.send({  status: "Error", error: error.message });
    }
})

app.post("/api/newincome", async (req, res) => {
    try {
        const income = new Income({            
            amount: req.body.amount,
            month: req.body.month,
            incomefrom: req.body.incomefrom,
            totalIncome: req.body.totalIncome,
            user: req.body._id,
        })
        const createdIncome = await income.save()
        console.log("Created Income!", createdIncome);
        res.send({ status:'ok'});

    } catch (error) {
        console.log("Error in inserting new income", error.message);
        res.send({ status: "Error", error: error.message });
    }
})

app.post("/api/login", async (req, res) => {
    const user = await User.findOne({
        email: req.body.email,
    })

    if (!user) {
        console.log("Invalid User email");
        return res.json({ status: 'error', error: 'Invalid User' })
    }

    const isValidPassword = await bcrypt.compare(req.body.password, user.password)

    if (isValidPassword) { //Using JWT Token
        const token = jwt.sign({   
            id: user._id,                    
            email: user.email,     
            name:user.name,
            designation: user.designation,
                                     
        },
            'myjwtsecret123'
        )
        console.log(token);
        return res.json({ status: "Ok, user found!", user: token }); //passed token here
    } else {
        return res.send({ status: "User not found!", user: false });
    }    
})

app.get("/api/getuser", async (req, res) => {
    try {
        const allUsers = await User.find({
        })
        const result = allUsers;
        res.status(200).json(result)
        console.log(result);
    } catch (error) {
        console.log("Error in finding users");
        return res.status(500).json(error.message)
    }
})

app.get("/api/getexpense", async (req, res) => {
    try{
        const singleExpense = await Expense.find({            
        })
        const result = singleExpense;
        res.status(200).json(result);
        console.log(result);
    } catch (error) {
        console.log("Error in finding expenditure");
        return res.status(500).json(error.message);
    }
})

app.get("/api/getallincome", async (req, res) => {
    try {
        const allIncome = await Income.find({
        })
        const result = allIncome;
        res.status(200).json(result)
        console.log(result);
    } catch (error) {
        console.log("Error in finding income");
        return res.status(500).json(error.message)
    }
})

app.get("/api/singleuser/:id", async (req, res) => {
    try {
        const allUsers = await User.findById(req.params.id);
        const result = allUsers;
        res.status(200).json(result);
        console.log(result);
    } catch (error) {
        console.log("Error in finding users");
        return res.status(500).json(error.message);
    }
})

