Sure Arun. Below is one complete Express.js source code that covers all 5 tasks.

Folder structure
express-task/
│
├── node_modules/
├── package.json
└── server.js

First create the project and install Express:

mkdir express-task
cd express-task
npm init -y
npm install express

Now create a file named server.js and add this code:

const express = require("express");

const app = express();
const PORT = 3000;

// Middleware to read JSON body
app.use(express.json());

// 4. Logger Middleware
app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

// 1. Basic Express Server
app.get("/", (req, res) => {
    res.send("Server is running");
});

// 2. Route Parameters
app.get("/user/:id", (req, res) => {
    const userId = req.params.id;

    res.json({
        id: userId
    });
});

// 3. Query Parameters
app.get("/search", (req, res) => {
    const name = req.query.name;

    res.json({
        name: name
    });
});

// 5. POST Request with JSON Body
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    res.json({
        message: "Login successful",
        user: username
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

Run it using:

node server.js

Your terminal should show:

Server running on http://localhost:3000

Then test these URLs.

Task	Method	URL
Basic server	GET	http://localhost:3000/
Route param	GET	http://localhost:3000/user/101
Query param	GET	http://localhost:3000/search?name=John
Logger	Any	Automatically logs every request
Login	POST	http://localhost:3000/login

For the POST /login request in Postman, select Body → raw → JSON and enter:

{
    "username": "admin",
    "password": "1234"
}

You will get:

{
    "message": "Login successful",
    "user": "admin"
}

And your terminal will log requests like:

GET /
GET /user/101
GET /search?name=John
POST /login

One important line is:

app.use(express.json());

Without this, Express cannot properly read JSON like:

{
    "username": "admin",
    "password": "1234"
}

from req.body.
