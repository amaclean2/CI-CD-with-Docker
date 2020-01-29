const app = require("express")()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const dbUrl = "mongodb://localhost:27017/testing"

const User = mongoose.Schema({
    name: {
        type: String,
        default: ""
    },
    phone_number: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        default: ""
    }
})

mongoose.Promise = global.Promise
mongoose.connect(dbUrl, { useNewUrlParser: true })

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use((request, response, next) => {
	response.setHeader('Access-Control-Allow-Origin', '*')
	response.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT')
	response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

	next()
})

app.get("/", (req, res) => {
    res.send("<h1>This is the initial page</h1>")
})

app.post("/users", (req, res) => {

    if (req.body) {
        const newUser = new User({
            name: req.body.name,
            phone_number: req.body.phone,
            email: req.body.email
        })

        const userData = newUser.save()
        res.status(200).json({
            response: "User created"
        })
    } else {
        res.status(400).json({
            response: "There was an error"
        })
    }
})

app.listen(8000, () => {
    console.log("listening on port 8000")
})