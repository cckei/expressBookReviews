const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
    let user = users.filter((user)=>user.username == username)[0];
    if(!user) return false;
    if(user.password == password) return true;
    return false;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    const {username, password} = req.body;

    // Authenticate the user
    if (authenticatedUser(username, password)) {
        const token = jwt.sign({ username }, "your_secret_key");
        req.session.user = token;
        return res.status(200).json({ message: "Logged in successfully", token });
    } else {
        return res.status(401).json({ message: "Invalid username or password" });
    }
});

regd_users.put("/auth/review", (req,res) => {
    return res.status(200).json({ message: "review added" });
});
regd_users.delete("/login2", (req,res) => {
    return res.status(200).json({ message: "review deleted" });
});



module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
