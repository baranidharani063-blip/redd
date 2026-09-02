Sure Arun 👍 புரிஞ்சுது. ஒவ்வொரு task-ஐயும் தனித்தனி question + code + output ஆக கொடுக்கிறேன். Beginner level-ல easy-ஆ follow பண்ணலாம்.

1️⃣ Basic Express Server
📝 Question

Create a Simple Express Server

Create an Express server that listens on port 3000 and returns "Server is running" when accessing the root route /.

Input:

GET /

Expected Output:

Server is running
💻 Code — server.js
const express = require("express");

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Server is running");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
▶️ Run
node server.js

Terminal:

Server running on port 3000

Browser/Postman:

http://localhost:3000/

Output:

Server is running
🔍 Important
app.get("/", ...)

/ → root route.

res.send("Server is running");

Client-க்கு response அனுப்புகிறது.

2️⃣ Route Parameters
📝 Question

Handle Route Params

Create an API endpoint /user/:id that returns the user ID from the URL.

Input:

GET /user/101

Expected Output:

{
    "id": "101"
}
💻 Code — server.js
const express = require("express");

const app = express();

const PORT = 3000;

app.get("/user/:id", (req, res) => {

    const userId = req.params.id;

    res.json({
        id: userId
    });

});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
▶️ Run
node server.js

Browser/Postman:

GET http://localhost:3000/user/101

Output:

{
    "id": "101"
}
🔍 Important

இந்த URL:

/user/101

இதில்:

:id

ஒரு route parameter.

அதை பெற:

req.params.id

Example:

/user/500

Output:

{
    "id": "500"
}
3️⃣ Query Parameters
📝 Question

Search Using Query Params

Create an endpoint /search that accepts a query parameter name and returns it.

Input:

GET /search?name=John

Expected Output:

{
    "name": "John"
}
💻 Code — server.js
const express = require("express");

const app = express();

const PORT = 3000;

app.get("/search", (req, res) => {

    const name = req.query.name;

    res.json({
        name: name
    });

});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
▶️ Run
node server.js

Browser/Postman:

GET http://localhost:3000/search?name=John

Output:

{
    "name": "John"
}
🔍 Important

URL:

/search?name=John

name=John → query parameter

Get it using:

req.query.name

Another example:

/search?name=Arun

Output:

{
    "name": "Arun"
}
4️⃣ Middleware Logging
📝 Question

Create a Logger Middleware

Create a middleware that logs the request method and URL for every incoming request.

💻 Code — server.js
const express = require("express");

const app = express();

const PORT = 3000;

// Logger Middleware
app.use((req, res, next) => {

    console.log(req.method, req.url);

    next();

});

// Test route
app.get("/", (req, res) => {
    res.send("Server is running");
});

app.get("/user/:id", (req, res) => {
    res.json({
        id: req.params.id
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
▶️ Run
node server.js

Now open:

http://localhost:3000/

Terminal output:

GET /

Then:

http://localhost:3000/user/101

Terminal:

GET /user/101
🔍 Important
app.use((req, res, next) => {

இதுதான் middleware.

req.method

Request method:

GET
POST
PUT
DELETE
req.url

Request URL:

/
 /user/101
 /search?name=John
next();

அடுத்த middleware அல்லது route-க்கு request-ஐ அனுப்பும்.

5️⃣ POST Request with JSON Body
📝 Question

Handle POST Request

Create a POST endpoint /login that accepts JSON body:

{
    "username": "admin",
    "password": "1234"
}

and returns:

{
    "message": "Login successful",
    "user": "admin"
}
💻 Code — server.js
const express = require("express");

const app = express();

const PORT = 3000;

// JSON Middleware
app.use(express.json());

// POST Login
app.post("/login", (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    res.json({
        message: "Login successful",
        user: username
    });

});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
▶️ Run
node server.js
📮 Postman

Method:

POST

URL:

http://localhost:3000/login

Go to:

Body → raw → JSON

Enter:

{
    "username": "admin",
    "password": "1234"
}
✅ Output
{
    "message": "Login successful",
    "user": "admin"
}
🔍 Important

இந்த line:

app.use(express.json());

JSON request body-ஐ Express read பண்ணுவதற்கு.

இந்த line:

req.body.username

JSON-ல இருந்து username எடுக்கிறது.

இந்த line:

req.body.password

password எடுக்கிறது.

🧠 இந்த 5 tasks-ல் நீ கற்றுக்கொள்ள வேண்டியது
Task	Main Concept	Code
1	Basic Server	app.get()
2	Route Parameter	req.params
3	Query Parameter	req.query
4	Middleware	app.use() + next()
5	JSON POST	req.body

Easy-ஆ நினைவில் வைக்க:

URL /user/101
       ↓
req.params.id
URL /search?name=John
                ↓
          req.query.name
POST JSON
   ↓
req.body.username

இந்த 5 concepts புரிஞ்சா Express.js basics-ல ஒரு நல்ல foundation வந்துடும்.
