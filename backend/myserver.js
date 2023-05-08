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
const moment = require('moment-timezone');
require('dotenv').config();
moment().tz("Asia/Calcutta").format();
process.env.TZ = 'Asia/Calcutta';
const multer = require("multer");
const fs = require("fs");
const chatGPT = require("openai");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/assets/uploads', express.static('assets/uploads')) //Using static folder (uploads) for multer
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

//---Storge defining for using multer
const documentStorage = multer.diskStorage({
    destination: (req, res, callback) => {
        callback(null, "./assets/uploads/")
    },
    filename: async (req, file, callback) => {
        const userId = req.params.id;
        const allUsers = await User.findById(userId)
        const userName = allUsers.name?.split(" ")[0];
        let finalFileName = `${file.fieldname}_${userName}_${moment().format('YYYY-MM-DD')}.${file.mimetype.split("/")[1]}`
        callback(null, finalFileName)
    },
});

const upload = multer({
    storage: documentStorage,
    //limits: { fileSize: 20000000 }, //20MB        
});


app.get("/", (req, res) => {
    res.send("Hi backend");
})

//For Uploding Profile Picture
app.post("/api/uploadprofilepic/:id", upload.single("user"), (req, res) => {
    const profileImgFile = req.file.path;
    if (!profileImgFile) {
        res.status(400).json({ Message: "Please choose image" })
    } else {
        console.log("Image uploaded!")
        res.status(200).json({ Status: "Ok" })
    }
});

//For uploading photo in DB
app.post("/api/uploadphotoindb/:id", upload.single("user"), async (req, res) => {
    try {
        const uploadUserPhoto = await User.findByIdAndUpdate(req.params.id, { profileimage: req.file.path })
        if (uploadUserPhoto) {
            console.log("Profile picture uploaded in database")
            return res.status(200).json({ statusCode: 1, message: "Profile picture uploaded in database" });
        } else {
            console.log("Profile picture couldnot be uploaded in database")
            return res.status(500).json({ statusCode: 0, error: "Profile picture couldnot be uploaded in database" });
        }
    } catch (error) {
        console.log("Error in uploading photo");
        return res.status(422).json({ statusCode: 0, error: error.message });
    }
});



app.patch("/api/updateuserdata/:id", async (req, res) => {
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        const result = updateUser;
        res.status(200).json(result);
        console.log("User data updated successfully")
    } catch (error) {
        console.log("Error in updating expenditure");
        return res.status(422).json(error.message);
    }
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
        //console.log("Created Expense!", createdExpense);
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
        //console.log("Created Income!", createdIncome);
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
        const annualIncome = result.reduce((accumulator, value) => (accumulator = accumulator + value.amount), 0);
        const highestSalary = allIncome.sort((a, b) => {
            return b.amount - a.amount
        })

        var salary = [];
        var incomeSource = [];
        var incomeDate = [];

        highestSalary?.map((value, index) => {
            salary[index] = value.amount;
            incomeSource[index] = value.incomefrom;
            incomeDate[index] = value.dateselect;
        });

        res.status(200).json({
            statusCode: 1,
            data: result,
            sortedData: highestSalary.slice(0, 3),
            annualSalary: annualIncome,
            highestSalary: salary.slice(0, 3),
            incomeFrom: incomeSource.slice(0, 3),
            incomeDate: incomeDate.slice(0, 3)
        });

        console.log("Salaty income is", salary);
    } catch (error) {
        console.log("Error in finding income");
        return res.status(404).json({ message: error.message })
    }
})

app.post("/api/getexpense", async (req, res) => {
    try {
        const { frequency, selectedDate } = req.body;
        //console.log("Frequency from req body", frequency);
        const numberOfDataPerPage = 10; //for pagination
        const pageNumber = parseInt(req.query.pageNumber) || 1;
        const dataSize = await Expense.countDocuments({});
        //console.log("Total Number of data is", dataSize);
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
        })
            .limit(numberOfDataPerPage) //mongoose fx for setting limit in pagination
            .skip((pageNumber - 1) * numberOfDataPerPage) //mongoose fx for skipping page in pagination

        //For sorting in decending order of amount
        const result = singleExpense.sort((a, b) => {
            return b.amount - a.amount
        });
        res.status(200).json({ totalPages: Math.ceil(dataSize / numberOfDataPerPage), data: result });
    } catch (error) {
        console.log("Error in finding expenditure", error);
        return res.status(500).json(error.message);
    }
})

//For getting Total Expenditure
app.post("/api/getTotalAmount", async (req, res) => {
    try {
        const { frequency, selectedDate } = req.body;
        //console.log("Frequency from req body", frequency);
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
        })

        //For sorting according to highest amount
        const result = singleExpense.sort((a, b) => {
            return b.amount - a.amount
        });

        var amountArray = [];
        result.map((value, index) => {
            amountArray[index] = value.amount
        })

        var itemsArray = [];
        result.map((value, index) => {
            itemsArray[index] = value.exppurpose
        })

        if (result.length !== 0 || result !== undefined) {
            let totalExp = result.reduce((accumulator, value) => accumulator = (accumulator + value.amount), 0)
            res.status(200).json({ data: totalExp, sortAmount: amountArray.slice(0, 3), fiveSortAmount: amountArray.slice(0, 14), fiveSortItems: itemsArray.slice(0, 14), sortItems: itemsArray.slice(0, 3) });
        } else {
            console.log("Found no such expenditure");
            return res.status(500).json({ statusCode: 0, message: "Found no such expenditure" });
        }
    } catch (error) {
        console.log("Error in finding expenditure", error);
        return res.status(500).json(error.message);
    }
})


//For getting Total Expenditure
app.post("/api/getLastMonthExp", async (req, res) => {
    try {
        const { frequency } = req.body;
        //console.log("Frequency from req body", frequency);
        const singleExpense = await Expense.find({
            dateofexp: {
                $gt: moment().subtract(Number(frequency), 'd').toDate()
            },
            userid: req.body.userid,
        })

        const result = singleExpense.sort((a, b) => {
            return b.amount - a.amount
        });

        //For sorting the amount and items
        var arrayAmount = [];
        var arrayItems = [];
        result.map((value, index) => {
            arrayAmount[index] = value.amount
            arrayItems[index] = value.exppurpose
        })

        const sortedAmountLastMonth = arrayAmount[0]
        const sortedItemsLastMonth = arrayItems[0];


        if (result.length !== 0 || result !== undefined) {
            res.status(200).json({ sortAmount: sortedAmountLastMonth, sortItems: sortedItemsLastMonth });
        } else {
            console.log("Found no such expenditure");
            return res.status(500).json({ statusCode: 0, message: "Found no such expenditure" });
        }
    } catch (error) {
        console.log("Error in finding expenditure", error);
        return res.status(500).json(error.message);
    }
})


app.post("/api/findExpenseRecurrence", async (req, res) => {
    Expense.aggregate([
        { $match: { userid: req.body.userid } }, // filter by userid
        { $group: { _id: "$categories", timesBought: { $sum: 1 }, totalAmount: { $sum: "$amount" } } }, //group by productName and count the occurrences. When you use the $group stage in the aggregation pipeline, you need to specify an _id field to group by. This field can be any valid expression, including a field name or a computed value.
        { $match: { timesBought: { $gt: 1 } } }, // filter by products that were bought more than once (here category is checked how many times it was repeated in purchase)
        { $sort: { timesBought: -1 } } // sort by timesBought in descending order        
    ], function (err, result) {
        if (err) {
            console.log(err)
            res.status(500).json({ statusCode: 0, error: err.message })
        } else {
            console.log(result)
            res.status(200).json({ statusCode: 1, data: result })
        }
    })
})


app.post("/api/findIncomeRecurrence", async (req, res) => {
    Income.aggregate([
        { $match: { userid: req.body.userid } },
        { $group: { _id: "$incomefrom", incomeTimes: { $sum: 1 }, totalIncome: { $sum: "$amount" } } },
        { $match: { incomeTimes: { $gt: 1 } } },
        { $sort: { incomeTimes: -1 } }
    ], function (err, result) {
        if (err) {
            console.log(err)
            res.status(500).json({ statusCode: 0, error: err.message })
        } else {
            console.log(result)
            res.status(200).json({ statusCode: 1, data: result })
        }
    })
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



app.post("/api/singleuser/:id", async (req, res) => {
    const userid = req.params.id;
    try {
        const allUsers = await User.findById(userid);
        const result = allUsers;
        let userName = result.name;
        res.status(200).json({ data: result });
        // console.log(result);
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