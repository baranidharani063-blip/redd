Sure 👍 உங்க current React + Tailwind Registration Form-க்கு complete backend சேர்த்து, MongoDB-ல் data save ஆகுற மாதிரி முழு project-ஐ beginner-friendly step-by-step கொடுக்கிறேன்.

Important: Password-ஐ plain text-ஆ database-ல் save பண்ணாமல் bcryptjs use பண்ணி hash செய்வோம்.

1. Final Project Structure
registration-app/
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── ...
│
└── backend/
    ├── models/
    │   └── User.js
    │
    ├── .env
    ├── server.js
    └── package.json
PART 1 — FRONTEND
Step 1: React project create

Terminal:

npm create vite@latest frontend

Select:

React
JavaScript

Then:

cd frontend
npm install

Tailwind already setup இல்லையென்றால்:

npm install tailwindcss @tailwindcss/vite
Step 2: App.jsx

src/App.jsx-ல் இந்த code:

import { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      alert(data.message);

      if (response.ok) {
        setFormData({
          name: "",
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-md">

        <h1 className="text-2xl font-bold text-center">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-6">
          Register to get started
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <div>
            <label>Full Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-2 mt-1"
            />
          </div>

          {/* Email */}
          <div>
            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-2 mt-1"
            />
          </div>

          {/* Password */}
          <div>
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-2 mt-1"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg"
          >
            Register
          </button>

        </form>

        <p className="text-center text-sm mt-6">
          Already have an account?{" "}
          <span className="text-blue-600">
            Login
          </span>
        </p>

      </div>

    </div>
  );
}

export default App;
இங்கே முக்கியமானது:

இந்த code:

fetch("http://localhost:5000/register")

React-லிருந்து backend-க்கு data அனுப்பும்.

PART 2 — BACKEND
Step 3: Backend folder create

frontend folder-க்கு வெளியே போங்க.

Structure:

registration-app/
├── frontend/
└── backend/

Terminal:

mkdir backend
cd backend
Step 4: Node project create
npm init -y

இது:

package.json

create பண்ணும்.

Step 5: Packages install
npm install express mongoose cors dotenv bcryptjs

இதுல:

Package	Purpose
express	Backend server
mongoose	MongoDB connection
cors	Frontend → Backend communication
dotenv	.env values
bcryptjs	Password hashing
Step 6: Backend folders

backend உள்ளே:

backend/
│
├── models/
│   └── User.js
│
├── .env
│
└── server.js
Step 7: User.js

backend/models/User.js

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
இது என்ன செய்கிறது?

MongoDB-ல் User எப்படி இருக்கணும் என்று define செய்கிறது.

User
│
├── name
├── email
├── password
└── createdAt
Step 8: MongoDB Atlas

இப்போ MongoDB database வேண்டும்.

MongoDB Atlas account create பண்ணி ஒரு cluster create பண்ணுங்க.

Atlas-ல்:

Database
   ↓
Connect
   ↓
Drivers
   ↓
Node.js

அங்கே ஒரு connection string கிடைக்கும்.

Example:

mongodb+srv://username:password@cluster.mongodb.net/registrationDB

உங்க actual username/password use பண்ணணும்.

Step 9: .env

backend/.env

MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/registrationDB

Example மட்டும்:

MONGO_URL=mongodb+srv://barani:123456@cluster.mongodb.net/registrationDB

⚠️ Real password-ஐ யாரிடமும் share பண்ணாதீங்க.

Step 10: server.js

backend/server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log("MongoDB Error:", error);
  });

// Register API
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check existing email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save to MongoDB
    await user.save();

    res.status(201).json({
      message: "Registration successful!",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

// Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
PART 3 — எப்படி இது WORK ஆகும்?

இது தான் மிக முக்கியம். 👇

User form-ல்:

Name:
Barani

Email:
barani@gmail.com

Password:
123456

Register click பண்ணுறீங்க.

Step 1 — React

handleSubmit() execute ஆகும்.

const handleSubmit = async (e) => {
Step 2 — React data collect செய்யும்
formData

இதுல:

{
  name: "Barani",
  email: "barani@gmail.com",
  password: "123456"
}
Step 3 — React backend-க்கு அனுப்பும்
fetch("http://localhost:5000/register", {

இதன் meaning:

React
  ↓
localhost:5000

Backend server-ஐ contact செய்கிறது.

Step 4 — POST request
method: "POST"

Meaning:

"Backend, நான் உனக்கு data அனுப்புறேன்."

Step 5 — Data JSON-ஆ போகும்
body: JSON.stringify(formData)

Backend-க்கு:

{
  "name": "Barani",
  "email": "barani@gmail.com",
  "password": "123456"
}
Step 6 — Express receive செய்யும்

Backend:

app.post("/register", async (req, res) => {

இது /register request-ஐ receive செய்யும்.

Step 7 — Data எடுத்துக்கொள்ளும்
const { name, email, password } = req.body;

இப்போ:

name     → Barani
email    → barani@gmail.com
password → 123456
Step 8 — Email already இருக்கா check
const existingUser = await User.findOne({ email });

MongoDB-ல்:

barani@gmail.com

already இருக்கிறதா என்று check செய்யும்.

Step 9 — Password hash

Original:

123456

Database-ல் direct-ஆ save செய்யமாட்டோம்.

const hashedPassword = await bcrypt.hash(password, 10);

Database-ல் something like:

$2b$10$..............

மாதிரி hashed value இருக்கும்.

Step 10 — User create
const user = new User({
  name,
  email,
  password: hashedPassword,
});
Step 11 — MongoDB-ல் save
await user.save();

இதுதான் actual database save.

MongoDB:

registrationDB
      ↓
users
      ↓
--------------------------------
name: Barani
email: barani@gmail.com
password: $2b$10$........
createdAt: ...
--------------------------------
Step 12 — Backend response

Backend:

res.status(201).json({
  message: "Registration successful!",
});

React அந்த response-ஐ receive செய்யும்:

const data = await response.json();

Then:

alert(data.message);

Browser-ல்:

Registration successful!

வரும். 🎉

PART 4 — எப்படி Run பண்ணுவது?

2 terminals open பண்ணுங்க.

Terminal 1 — Backend
cd backend
node server.js

Output:

Server running on port 5000
MongoDB Connected
Terminal 2 — Frontend
cd frontend
npm run dev

Output:

Local: http://localhost:5173/

Browser:

http://localhost:5173

Open பண்ணுங்க.

Final Architecture
                USER
                 │
                 ▼
        ┌─────────────────┐
        │  React + Tailwind│
        │  Registration UI │
        └────────┬────────┘
                 │
                 │ fetch()
                 ▼
        ┌─────────────────┐
        │ Node.js + Express│
        │    POST /register│
        └────────┬────────┘
                 │
                 │ Mongoose
                 ▼
        ┌─────────────────┐
        │     MongoDB      │
        │   registrationDB │
        │                   │
        │ Users Collection  │
        └─────────────────┘
உங்க project-ல இப்போ என்ன கற்றுக்கிட்டீங்க?
React
  ↓
useState
  ↓
Form
  ↓
fetch()
  ↓
API
  ↓
Express
  ↓
Mongoose
  ↓
MongoDB

இதுதான் ஒரு basic full-stack registration project.

அடுத்த logical step Login. அதில் React login form → /login API → MongoDB email/password check → bcrypt.compare() → successful login என்று build பண்ணலாம்.
