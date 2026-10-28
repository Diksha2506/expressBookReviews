const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

// Check if username is valid (non-empty and not already taken)
const isValid = (username) => {
  if (!username || username.trim() === "") return false;
  let existingUser = users.find(u => u.username === username);
  return !existingUser; // valid only if username NOT already taken
};

// Check if username/password match a registered user
const authenticatedUser = (username, password) => {
  let validUser = users.find(u => u.username === username && u.password === password);
  return validUser !== undefined;
};

// POST /customer/login — only registered users can login
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  if (authenticatedUser(username, password)) {
    // Generate JWT token
    let accessToken = jwt.sign(
      { data: username },
      "access",
      { expiresIn: 60 * 60 } // 1 hour
    );

    // Store token in session
    req.session.authorization = { accessToken, username };

    return res.status(200).json({
      message: "Customer successfully logged in",
      accessToken
    });
  } else {
    return res.status(401).json({ message: "Invalid login credentials" });
  }
});

// PUT /customer/auth/review/:isbn — Add or modify a book review (authenticated users only)
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const review = req.query.review;
  const username = req.user.data; // Set by auth middleware in index.js

  if (!review) {
    return res.status(400).json({ message: "Review text is required as a query parameter" });
  }

  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found for ISBN: " + isbn });
  }

  // Add or update review — one review per user per book
  books[isbn].reviews[username] = review;

  return res.status(200).json({
    message: "Review successfully added/updated",
    book: isbn,
    reviews: books[isbn].reviews
  });
});

// DELETE /customer/auth/review/:isbn — Delete a book review (authenticated users only)
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const username = req.user.data; // Set by auth middleware in index.js

  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found for ISBN: " + isbn });
  }

  if (!books[isbn].reviews[username]) {
    return res.status(404).json({ message: "No review found for this user on ISBN: " + isbn });
  }

  // Delete only this user's review
  delete books[isbn].reviews[username];

  return res.status(200).json({
    message: "Review successfully deleted",
    book: isbn,
    reviews: books[isbn].reviews
  });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
