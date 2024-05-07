const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const {username, password} = req.body;
  if(!username) return res.status(400).json({message: "please enter the username"});
  if(!password) return res.status(400).json({message: "please enter the password"});

  if(users.filter((user)=>user.username == username).length){
    return res.status(400).json({message: "user exists."});
  }

  users.push({
    username: username,
    password: password
  })
  return res.status(200).json({message: "user created."});

});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.status(200).json({books: books});
  
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  var isbn = req.params.isbn;
  var bookDetails = books[isbn];
  return res.status(200).json({bookDetails: bookDetails});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  var author = req.params.author;
  for(var key in books){
    if(books[key].author == author){
        var bookDetails = books[key];
        return res.status(200).json(bookDetails);  
    }
  }
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    var title = req.params.title;
    for(var key in books){
      if(books[key].title == title){
          var bookDetails = books[key];
          return res.status(200).json(bookDetails);  
      }
    }
    return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    var isbn = req.params.isbn;
    var bookDetails = books[isbn];
    return res.status(200).json({message: 'review added'});
});

module.exports.general = public_users;
