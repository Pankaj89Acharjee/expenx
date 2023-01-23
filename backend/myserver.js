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
const { Configuration, OpenAIApi } = require("openai");
const moment = require("moment");
const chatGPT = require("openai");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const DB_CONNECTION = process.env.MONGODBCONNECTION;
const CHATGPTKEY = process.env.CHATGPTKEY

mongoose.connect(DB_CONNECTION, {
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
            city: req.body.city,
            mobile: req.body.mobile
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
            userid: req.body.userid,
            exppurpose: req.body.exppurpose,
            amount: req.body.amount,
            categories: req.body.categories,
            dateofexp: req.body.dateofexp,

        })
        const createdExpense = await expense.save()
        console.log("Created Expense!", createdExpense);
        res.status(200).json({ StatusCode: "1", message: 'New Expenditure Created', expense: createdExpense });

    } catch (error) {
        console.log("Error in inserting new expense", error.message);
        res.status(422).json({ status: "Error", error: error.message });
    }
})

app.post("/api/newincome", async (req, res) => {
    try {
        const income = new Income({
            userid: req.body.userid,
            amount: req.body.amount,
            dateselect: req.body.dateselect,
            incomefrom: req.body.incomefrom,
        })
        const createdIncome = await income.save()
        console.log("Created Income!", createdIncome);
        res.status(200).json({ StatusCode: '1', Message: 'New Income Created', Income: createdIncome });

    } catch (error) {
        console.log("Error in inserting new income", error.message);
        res.status(422).json({ StatusCode: "0", Message: 'Error in Saving', Error: error.message });
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
            name: user.name,
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

app.post("/api/getincome", async (req, res) => {
    try {
        const { frequency, selectedDate } = req.body;
        const allIncome = await Income.find({
            ...(frequency !== "custom" ? {
                dateselect: {
                    $gt: moment().subtract(Number(frequency), 'd').toDate()
                },
            } : {
                dateselect: {
                    $gte: selectedDate[0],
                    $lte: selectedDate[1]
                }
            }),
            userid: req.body.userid,
        })
        const result = allIncome;
        res.status(200).json(result)
        console.log(result);
    } catch (error) {
        console.log("Error in finding income");
        return res.status(404).json(error.message)
    }
})

app.post("/api/getexpense", async (req, res) => {
    try {
        const { frequency, selectedDate } = req.body;
        // console.log("Frequency from req body", frequency);
        const singleExpense = await Expense.find({
            ...(frequency !== "custom" ? {
                dateofexp: {
                    $gt: moment().subtract(Number(frequency), 'd').toDate()
                },
            } : {
                dateofexp: {
                    $gte: selectedDate[0],
                    $lte: selectedDate[1]
                }
            }),
            userid: req.body.userid,
        });
        const result = singleExpense;
        res.status(200).json(result);
        console.log(result);
    } catch (error) {
        console.log("Error in finding expenditure");
        return res.status(500).json(error.message);
    }
})

app.post("/api/viewchart", async (req, res) => {
    const { frequency, customdate } = req.body;
    try {
        const userChart = await Expense.find({
            ...(frequency !== "custom" ? {
                dateofexp: {
                    $gt: moment().subtract(Number(frequency), 'd').toDate()
                }
            } : {
                dateofexp: {
                    $gte: customdate[0],
                    $lte: customdate[1]
                },
            }),
            userid: req.body.userid,
        })
        const result = userChart;
        res.status(200).json(result);
        console.log("View Chart Details are", result);
    } catch (error) {
        console.log("Error in finding expenditure");
        return res.status(500).json(error.message);
    }
})



app.get("/api/singleuser/:id", async (req, res) => {
    const userid = req.params.userid;
    try {
        const allUsers = await User.find(userid);
        const result = allUsers;
        res.status(200).json(result);
        console.log(result);
    } catch (error) {
        console.log("Error in finding users");
        return res.status(500).json(error.message);
    }
})

app.post("/category/myprofile", async (req, res) => {
    try {
        const allUsers = await User.findById(req.body.userid);
        const result = allUsers;
        res.status(200).json(result);
        console.log(result);
    } catch (error) {
        console.log("Error in finding user");
        return res.status(500).json(error.message);
    }
})


//For Fetching Specific data
app.get("/api/editexpenditure/:id", async (req, res) => {
    try {
        const editExp = await Expense.findById(req.params.id);
        const result = editExp;
        res.status(200).json(result);
        console.log("Expenditure Found", result);
    } catch (error) {
        console.log("Error in finding expenditure");
        return res.status(422).json(error.message);
    }
})

app.patch("/api/updateexpenditure/:id", async (req, res) => {
    try {
        const updateExp = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
        const result = updateExp;
        res.status(200).json(result);
        console.log("Updated with new values", result);
    } catch (error) {
        console.log("Error in updating expenditure");
        return res.status(422).json(error.message);
    }
})

app.delete("/api/deleteexp/:id", async (req, res) => {
    try {
        const deleteExp = await Expense.findByIdAndDelete(req.params.id);
        const result = deleteExp;
        res.status(200).json(result);
        console.log("Expense deleted!", result);
    } catch (error) {
        console.log("Error in deleting expenditure");
        return res.status(422).json(error.message);
    }
})

//For finding a particular income to edit
app.get("/api/editincome/:id", async (req, res) => {
    try {
        const editInc = await Income.findById(req.params.id);
        res.status(200).json(editInc);
        console.log("Income Data found");
    } catch (error) {
        console.log("Error in finding expenditure");
        return res.status(422).json(error.message);
    }
})

app.patch("/api/updateincome/:id", async (req, res) => {
    try {
        const updateExp = await Income.findByIdAndUpdate(req.params.id, req.body, { new: true });
        const result = updateExp;
        res.status(200).json(result);
        console.log("Updated with new values", result);
    } catch (error) {
        console.log("Error in updating income");
        return res.status(422).json(error.message);
    }
})

app.delete("/api/deleteincome/:id", async (req, res) => {
    try {
        const deleteIncome = await Income.findByIdAndDelete(req.params.id);
        const result = deleteIncome;
        res.status(200).json(result);
        console.log("Income data deleted!", result);
    } catch (error) {
        console.log("Error in deleting income data");
        res.status(422).json(error.message);
    }
})


//For ChatGPT
const configuration = new Configuration({
    apiKey: CHATGPTKEY,
});
const openai = new OpenAIApi(configuration);

app.post("/category/chatgpt", async (req, res) => {
    var messageBody = []
    var { msg } = req.body
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: msg,
            temperature: 0.5,
            max_tokens: 100,
        });
        messageBody = response
        //console.log("response in chatgpt", messageBody.data.choices[0].text);
        res.status(200).json({ message: messageBody.data.choices[0].text })
    } catch (err) {
        console.log("Error in Chat GPT");
    }
})