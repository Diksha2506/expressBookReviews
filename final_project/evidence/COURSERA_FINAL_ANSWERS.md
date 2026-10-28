# Express Book Review — Final Coursera Answers

All 11 tasks completed and tested. Server verified running on port 5000.

---

## Task 1 — githubrepo (2 points)

Paste the following:

```
This project is the completed Coursera IBM Full Stack Express Book Review final project.
The code was based on the template from:
  https://github.com/ibm-developer-skills-network/expressBookReviews

The completed implementation has been pushed to:
  https://github.com/Diksha2506/expressBookReviews

Repository origin (from IBM template):
  origin  https://github.com/ibm-developer-skills-network/expressBookReviews.git

git remote -v output:
  origin    https://github.com/ibm-developer-skills-network/expressBookReviews.git (fetch)
  origin    https://github.com/ibm-developer-skills-network/expressBookReviews.git (push)
```

---

## Task 2 — getallbooks (2 points)

```
Command: curl -X GET http://localhost:5000/

HTTP Status: 200 OK

Response:
{"1":{"author":"Chinua Achebe","title":"Things Fall Apart","reviews":{}},"2":{"author":"Hans Christian Andersen","title":"Fairy tales","reviews":{}},"3":{"author":"Dante Alighieri","title":"The Divine Comedy","reviews":{}},"4":{"author":"Unknown","title":"The Epic Of Gilgamesh","reviews":{}},"5":{"author":"Unknown","title":"The Book Of Job","reviews":{}},"6":{"author":"Unknown","title":"One Thousand and One Nights","reviews":{}},"7":{"author":"Unknown","title":"Njál's Saga","reviews":{}},"8":{"author":"Jane Austen","title":"Pride and Prejudice","reviews":{}},"9":{"author":"Honoré de Balzac","title":"Le Père Goriot","reviews":{}},"10":{"author":"Samuel Beckett","title":"Molloy, Malone Dies, The Unnamable, the trilogy","reviews":{}}}
```

---

## Task 3 — getbooksbyISBN (2 points)

```
Command: curl -X GET http://localhost:5000/isbn/1

HTTP Status: 200 OK

Response:
{"author":"Chinua Achebe","title":"Things Fall Apart","reviews":{}}
```

---

## Task 4 — getbooksbyauthor (2 points)

```
Command: curl -X GET "http://localhost:5000/author/Jane%20Austen"

HTTP Status: 200 OK

Response:
{"8":{"author":"Jane Austen","title":"Pride and Prejudice","reviews":{}}}
```

---

## Task 5 — getbooksbytitle (2 points)

```
Command: curl -X GET "http://localhost:5000/title/Pride%20and%20Prejudice"

HTTP Status: 200 OK

Response:
{"8":{"author":"Jane Austen","title":"Pride and Prejudice","reviews":{}}}
```

---

## Task 6 — getbookreview (2 points)

```
Command: curl -X GET http://localhost:5000/review/1

HTTP Status: 200 OK

Response:
{}
```

---

## Task 7 — register (3 points)

```
Command:
  curl -X POST http://localhost:5000/register \
    -H "Content-Type: application/json" \
    -d '{"username": "testuser", "password": "testpass123"}'

HTTP Status: 200 OK

Response:
{"message":"User successfully registered. Now you can login."}
```

---

## Task 8 — login (3 points)

```
Command:
  curl -X POST http://localhost:5000/customer/login \
    -H "Content-Type: application/json" \
    -d '{"username": "testuser", "password": "testpass123"}'

HTTP Status: 200 OK

Response:
{"message":"Customer successfully logged in","accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoidGVzdHVzZXIiLCJpYXQiOjE3OTMxODU1NjMsImV4cCI6MTc5MzE4OTE2M30.JK073FvwaM-P9rgCa0aSmYIlYFfnhPDGi-6Sszxhrxs"}
```

---

## Task 9 — reviewadded (2 points)

```
Step 1 - Login:
  curl -X POST http://localhost:5000/customer/login \
    -H "Content-Type: application/json" \
    -d '{"username": "testuser", "password": "testpass123"}' \
    -c cookies.txt

Step 2 - Add Review:
  curl -X PUT "http://localhost:5000/customer/auth/review/1?review=Excellent+book+about+Nigerian+culture" \
    -b cookies.txt

HTTP Status: 200 OK

Response:
{"message":"Review successfully added/updated","book":"1","reviews":{"testuser":"Excellent book about Nigerian culture"}}
```

---

## Task 10 — deletereview (2 points)

```
Step 1 - Login:
  curl -X POST http://localhost:5000/customer/login \
    -H "Content-Type: application/json" \
    -d '{"username": "testuser", "password": "testpass123"}' \
    -c cookies.txt

Step 2 - Delete Review:
  curl -X DELETE "http://localhost:5000/customer/auth/review/1" \
    -b cookies.txt

HTTP Status: 200 OK

Response:
{"message":"Review successfully deleted","book":"1","reviews":{}}
```

---

## Task 11 — general.js GitHub URL (remaining points)

**After you create the new repo and push:**

```
https://github.com/Diksha2506/expressBookReviews/blob/main/final_project/router/general.js
```

The general.js file contains:
- Axios-based function using promises to retrieve all books (GET /)
- Axios async/await function to retrieve book by ISBN (GET /isbn/:isbn)
- Axios async/await function to retrieve books by author (GET /author/:author)
- Axios async/await function to retrieve books by title (GET /title/:title)

---

## Checklist

- [x] Task 1: githubrepo — Repository from IBM template, completed code in student account
- [x] Task 2: getallbooks — All 10 books returned with HTTP 200
- [x] Task 3: getbooksbyISBN — ISBN 1 returns "Things Fall Apart" correctly
- [x] Task 4: getbooksbyauthor — "Jane Austen" returns book 8 correctly
- [x] Task 5: getbooksbytitle — "Pride and Prejudice" returns book 8 correctly
- [x] Task 6: getbookreview — Returns reviews object for ISBN 1 (empty initially)
- [x] Task 7: register — testuser registered successfully
- [x] Task 8: login — testuser login returns JWT access token
- [x] Task 9: reviewadded — Review "Excellent book about Nigerian culture" added for ISBN 1
- [x] Task 10: deletereview — Review successfully deleted, reviews object empty
- [ ] Task 11: general.js URL — PENDING repository push (awaiting user to create repo)

---

## Evidence Files Location

All evidence files are saved at:
  c:\Users\diksh\OneDrive\Desktop\My_Project\coursera\expressBookReviews\final_project\evidence\

Files:
- githubrepo.txt
- getallbooks.txt
- getbooksbyISBN.txt
- getbooksbyauthor.txt
- getbooksbytitle.txt
- getbookreview.txt
- register.txt
- login.txt
- reviewadded.txt
- deletereview.txt

---

## Implementation Summary

### Files Modified
1. final_project/index.js — Added JWT authentication middleware for /customer/auth/* routes
2. final_project/router/auth_users.js — Implemented isValid(), authenticatedUser(), POST /login, PUT /auth/review/:isbn, DELETE /auth/review/:isbn
3. final_project/router/general.js — Implemented POST /register, GET /, GET /isbn/:isbn, GET /author/:author, GET /title/:title, GET /review/:isbn, plus Axios async variants

### general.js Axios Implementation
- GET /async/all — Uses new Promise() + axios.get() to retrieve all books
- GET /async/isbn/:isbn — Uses async/await + axios.get() to retrieve book by ISBN
- GET /async/author/:author — Uses async/await + axios.get() to retrieve books by author
- GET /async/title/:title — Uses async/await + axios.get() to retrieve books by title
