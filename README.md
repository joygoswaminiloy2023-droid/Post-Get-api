# 📝 Blog Post API

A simple RESTful Blog Post API built with **Node.js** and **Express.js**.

This project is designed as a beginner-friendly backend project for learning how to build REST APIs, handle HTTP requests, validate data, and return JSON responses.

---

## 🚀 Features

- Create a new blog post
- Retrieve a blog post by ID
- Automatic ID generation
- Automatic creation timestamp
- JSON request body support
- Input validation
- Error handling
- Proper HTTP status codes
- 404 handling for unavailable posts
- 404 handling for undefined routes
- Simple in-memory data storage

---

## 🛠️ Technologies Used

- **Node.js**
- **Express.js**
- **JavaScript**
- **REST API**
- **JSON**
- **HTTP**

---

## 📂 Project Structure

```text
blog-post-api/
│
├── node_modules/
│
├── server.js
│
├── package.json
│
├── package-lock.json
│
└── README.md
```

---

# ⚙️ Getting Started

## Prerequisites

Make sure you have **Node.js** and **npm** installed on your computer.

Check your Node.js version:

```bash
node -v
```

Check your npm version:

```bash
npm -v
```

---

## 📥 Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/blog-post-api.git
```

> Replace `your-username` with your GitHub username.

### 2. Navigate to the project

```bash
cd blog-post-api
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the server

```bash
npm start
```

The server will run on:

```text
http://localhost:3000
```

You should see:

```text
Blog Post API running at http://localhost:3000
```

---

# 📌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/posts` | Create a new blog post |
| `GET` | `/posts/:id` | Get a blog post by ID |

---

# 1️⃣ Create a Blog Post

Creates a new blog post.

### Endpoint

```http
POST /posts
```

### URL

```text
http://localhost:3000/posts
```

### Headers

```text
Content-Type: application/json
```

### Request Body

```json
{
  "title": "My First Blog",
  "content": "This is my first blog post using Express.js.",
  "author": "Niloy"
}
```

### Successful Response

**Status Code:**

```text
201 Created
```

### Response

```json
{
  "message": "Blog post created successfully",
  "post": {
    "id": 1,
    "title": "My First Blog",
    "content": "This is my first blog post using Express.js.",
    "author": "Niloy",
    "createdAt": "2026-08-26T12:00:00.000Z"
  }
}
```

> The `createdAt` value is generated automatically by the server, so the exact timestamp will be different for each request.

---

# 2️⃣ Get a Blog Post by ID

Retrieves a blog post using its ID.

### Endpoint

```http
GET /posts/:id
```

### Example

```text
http://localhost:3000/posts/1
```

### Successful Response

**Status Code:**

```text
200 OK
```

### Response

```json
{
  "id": 1,
  "title": "My First Blog",
  "content": "This is my first blog post using Express.js.",
  "author": "Niloy",
  "createdAt": "2026-08-26T12:00:00.000Z"
}
```

---

# ❌ Validation

The API validates every blog post before storing it.

## Title

The title:

- Is required
- Must be a string
- Must contain at least 3 characters

## Content

The content:

- Is required
- Must be a string
- Must contain at least 10 characters

## Author

The author:

- Is required
- Must be a string
- Cannot be empty

---

# ⚠️ Validation Error Example

### Request

```json
{
  "title": "Hi",
  "content": "Short",
  "author": ""
}
```

### Response

**Status Code:**

```text
400 Bad Request
```

```json
{
  "error": "Validation failed",
  "details": [
    "title is required and must be at least 3 characters long",
    "content is required and must be at least 10 characters long",
    "author is required"
  ]
}
```

---

# ❗ Error Handling

The API handles invalid IDs, missing posts, and undefined routes.

---

## Invalid Post ID

If the ID is not an integer:

```http
GET /posts/abc
```

Response:

**Status Code:**

```text
400 Bad Request
```

```json
{
  "error": "Post ID must be a valid integer"
}
```

---

## Post Not Found

If the requested post does not exist:

```http
GET /posts/999
```

Response:

**Status Code:**

```text
404 Not Found
```

```json
{
  "error": "Blog post with ID 999 not found"
}
```

---

## Undefined Route

If a route that does not exist is requested:

```http
GET /hello
```

Response:

**Status Code:**

```text
404 Not Found
```

```json
{
  "error": "Route not found"
}
```

---

# 🧪 Testing the API

You can test this API using:

- **Postman**
- **Thunder Client**
- **Insomnia**
- **cURL**

---

# 📮 Testing with Postman

## Create a Post

Select:

```text
POST
```

Enter:

```text
http://localhost:3000/posts
```

Go to:

```text
Body → raw → JSON
```

Enter:

```json
{
  "title": "Learning Node.js",
  "content": "Today I learned how to create a REST API using Express.js.",
  "author": "Niloy"
}
```

Click:

```text
Send
```

You should receive a `201 Created` response.

---

## Get a Post

Select:

```text
GET
```

Enter:

```text
http://localhost:3000/posts/1
```

Click:

```text
Send
```

You should receive the blog post with ID `1`.

---

# 💻 Testing with cURL

## Create a Post

```bash
curl -X POST http://localhost:3000/posts \
-H "Content-Type: application/json" \
-d "{\"title\":\"My Blog\",\"content\":\"This is a blog post created using the API.\",\"author\":\"Niloy\"}"
```

---

## Get a Post

```bash
curl http://localhost:3000/posts/1
```

---

# 🗄️ Data Storage

This project currently uses **in-memory storage**.

Posts are stored in a JavaScript array:

```javascript
let posts = [];
```

The server generates an ID for every new post:

```javascript
let nextId = 1;
```

When a post is created, the ID increases automatically.

For example:

```text
Post 1
Post 2
Post 3
Post 4
```

### ⚠️ Important

Because the application uses in-memory storage, all posts will be lost when the server restarts.

For a production application, a database should be used.

Possible database choices include:

- MongoDB
- PostgreSQL
- MySQL

---

# 🔄 How the API Works

The basic request flow looks like this:

```text
                CLIENT
                   │
                   │ HTTP Request
                   ▼
          ┌─────────────────┐
          │  Express Server │
          └────────┬────────┘
                   │
          ┌────────┴────────┐
          │                 │
          ▼                 ▼
    POST /posts       GET /posts/:id
          │                 │
          ▼                 ▼
     Validate Data      Find Post
          │                 │
          └────────┬────────┘
                   │
                   ▼
           In-Memory Array
                   │
                   ▼
             JSON Response
                   │
                   ▼
                CLIENT
```

---


# 📸 API Testing Screenshots

## GET `/posts/1`

The API successfully returns a single blog post by its ID.

![GET Post by ID](assetes/Screenshot(1458).png)

---

## GET `/posts`

The API successfully returns the available blog posts.

![GET All Posts](screenshots/get-all-posts.png)

---


# 💻 Development / Server Running

The API can also be run directly from the VS Code terminal using Node.js.

The screenshot below shows the project structure, `server.js`, and the Express server successfully running on `http://localhost:3000`.

![Blog Post API running in VS Code](assets/server-running-in-vscode.png)

---

# 📚 What This Project Demonstrates

This project covers several important backend concepts.

## Node.js

Node.js is used to run JavaScript on the server.

## Express.js

Express.js is used to create the HTTP server and API routes.

## REST API

The application follows a REST-style API structure.

## HTTP Methods

The project currently uses:

```text
POST
GET
```

### POST

Used to create a new blog post.

```text
POST /posts
```

### GET

Used to retrieve an existing blog post.

```text
GET /posts/:id
```

---

## Request Body

The client sends blog data as JSON.

Example:

```json
{
  "title": "Hello World",
  "content": "This is my first post.",
  "author": "Niloy"
}
```

Express parses this using:

```javascript
app.use(express.json());
```

---

## Route Parameters

The API uses a route parameter to identify a post:

```text
/posts/:id
```

For example:

```text
/posts/1
/posts/2
/posts/3
```

The server reads the ID using:

```javascript
req.params.id
```

---

## Validation

Before creating a post, the server checks:

- Title
- Content
- Author

Invalid data is rejected with:

```text
400 Bad Request
```

---

## HTTP Status Codes

The API uses meaningful HTTP status codes:

| Status | Meaning |
|--------|---------|
| `200` | Request successful |
| `201` | Resource created |
| `400` | Invalid request |
| `404` | Resource or route not found |

---

# 📦 Dependencies

The project uses Express.js.

The dependency is defined in `package.json`:

```json
{
  "dependencies": {
    "express": "^4.19.2"
  }
}
```

Install it using:

```bash
npm install
```

---

# ▶️ Available Commands

Install dependencies:

```bash
npm install
```

Start the server:

```bash
npm start
```

---

# 🔮 Future Improvements

The current project is intentionally simple. The following features can be added in future versions.

## CRUD Operations

```text
POST    /posts
GET     /posts
GET     /posts/:id
PUT     /posts/:id
DELETE  /posts/:id
```

## Planned Features

- [ ] Get all blog posts
- [ ] Update a blog post
- [ ] Delete a blog post
- [ ] MongoDB integration
- [ ] Mongoose integration
- [ ] User registration
- [ ] User login
- [ ] JWT authentication
- [ ] Authorization
- [ ] Pagination
- [ ] Search posts
- [ ] Categories
- [ ] Tags
- [ ] Comments
- [ ] Image uploads
- [ ] Environment variables
- [ ] Automated testing
- [ ] API documentation
- [ ] Deployment

---

# 🌐 Future Architecture

After adding a database and frontend, the project can be extended into a full-stack application:

```text
             ┌───────────────────┐
             │     Frontend      │
             │ React / Next.js   │
             └─────────┬─────────┘
                       │
                       │ HTTP / REST API
                       ▼
             ┌───────────────────┐
             │    Express.js     │
             │      Server       │
             └─────────┬─────────┘
                       │
                       │ Mongoose
                       ▼
             ┌───────────────────┐
             │      MongoDB      │
             │      Database     │
             └───────────────────┘
```

---

# 🔐 Production Improvements

Before using the application in production, additional features should be added:

```text
Environment Variables
        ↓
Database
        ↓
Authentication
        ↓
Authorization
        ↓
Input Validation
        ↓
Security
        ↓
Error Handling
        ↓
Testing
        ↓
Deployment
```

---

# 📈 Project Roadmap

### Version 1.0

- [x] Express server
- [x] Create blog post
- [x] Get blog post by ID
- [x] Input validation
- [x] Error handling
- [x] In-memory storage

### Version 2.0

- [ ] Get all posts
- [ ] Update posts
- [ ] Delete posts
- [ ] Full CRUD API

### Version 3.0

- [ ] MongoDB
- [ ] Mongoose
- [ ] Persistent data storage

### Version 4.0

- [ ] User authentication
- [ ] JWT
- [ ] Authorization

### Version 5.0

- [ ] Frontend
- [ ] Deployment
- [ ] Production-ready application

---

# 📄 License

This project is created for **learning and educational purposes**.

You are free to modify, improve, and use the project for your own learning.

---

# 👨‍💻 Author

## Niloy

Backend development learning project built using:

- Node.js
- Express.js
- JavaScript
- REST API

---

# ⭐ Project Status

```text
🟢 Active Learning Project
```

The current version provides basic blog post creation and retrieval functionality.

Future versions will include complete CRUD functionality, database integration, authentication, and deployment.

---

## ❤️ Thank You

Thank you for checking out this project!

If you found this project useful, consider giving the repository a ⭐ on GitHub.

---

**Built with ❤️ using Node.js and Express.js**
