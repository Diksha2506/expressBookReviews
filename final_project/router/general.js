const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const BASE_URL = "http://localhost:5000";

// ─── Task 6: Register a new user ────────────────────────────────────────────
public_users.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  if (!isValid(username)) {
    return res.status(409).json({ message: "Username already exists. Please choose a different username." });
  }

  // Register the new user
  users.push({ username, password });

  return res.status(200).json({ message: "User successfully registered. Now you can login." });
});

// ─── Task 1: Get all books (sync + Axios/Promise version) ────────────────────
public_users.get('/', function (req, res) {
  return res.status(200).json(books);
});

// Axios Promise version — retrieves all books using a promise
public_users.get('/async/all', function (req, res) {
  const getAllBooks = new Promise((resolve, reject) => {
    axios.get(BASE_URL + "/")
      .then(response => resolve(response.data))
      .catch(err => reject(err));
  });

  getAllBooks
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({ message: "Error retrieving books", error: err.message }));
});

// ─── Task 2: Get book details based on ISBN ──────────────────────────────────
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (book) {
    return res.status(200).json(book);
  } else {
    return res.status(404).json({ message: "Book not found for ISBN: " + isbn });
  }
});

// Axios async/await version — retrieves book by ISBN
public_users.get('/async/isbn/:isbn', async function (req, res) {
  const isbn = req.params.isbn;
  try {
    const response = await axios.get(BASE_URL + "/isbn/" + isbn);
    return res.status(200).json(response.data);
  } catch (err) {
    return res.status(404).json({ message: "Book not found for ISBN: " + isbn });
  }
});

// ─── Task 3: Get book details based on author ────────────────────────────────
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  const matchingBooks = {};

  Object.keys(books).forEach(isbn => {
    if (books[isbn].author.toLowerCase() === author.toLowerCase()) {
      matchingBooks[isbn] = books[isbn];
    }
  });

  if (Object.keys(matchingBooks).length > 0) {
    return res.status(200).json(matchingBooks);
  } else {
    return res.status(404).json({ message: "No books found for author: " + author });
  }
});

// Axios async/await version — retrieves books by author
public_users.get('/async/author/:author', async function (req, res) {
  const author = req.params.author;
  try {
    const response = await axios.get(BASE_URL + "/author/" + encodeURIComponent(author));
    return res.status(200).json(response.data);
  } catch (err) {
    return res.status(404).json({ message: "No books found for author: " + author });
  }
});

// ─── Task 4: Get all books based on title ────────────────────────────────────
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  const matchingBooks = {};

  Object.keys(books).forEach(isbn => {
    if (books[isbn].title.toLowerCase().includes(title.toLowerCase())) {
      matchingBooks[isbn] = books[isbn];
    }
  });

  if (Object.keys(matchingBooks).length > 0) {
    return res.status(200).json(matchingBooks);
  } else {
    return res.status(404).json({ message: "No books found with title: " + title });
  }
});

// Axios async/await version — retrieves books by title
public_users.get('/async/title/:title', async function (req, res) {
  const title = req.params.title;
  try {
    const response = await axios.get(BASE_URL + "/title/" + encodeURIComponent(title));
    return res.status(200).json(response.data);
  } catch (err) {
    return res.status(404).json({ message: "No books found with title: " + title });
  }
});

// ─── Task 5: Get book review by ISBN ────────────────────────────────────────
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];

  if (book) {
    return res.status(200).json(book.reviews);
  } else {
    return res.status(404).json({ message: "Book not found for ISBN: " + isbn });
  }
});

module.exports.general = public_users;
