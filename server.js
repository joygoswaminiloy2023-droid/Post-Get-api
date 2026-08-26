
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let posts = [];
let nextId = 1;


function validatePost({ title, content, author }) {
  const errors = [];

  if (!title || typeof title !== "string" || title.trim().length < 3) {
    errors.push("title is required and must be at least 3 characters long");
  }

  if (!content || typeof content !== "string" || content.trim().length < 10) {
    errors.push("content is required and must be at least 10 characters long");
  }

  if (!author || typeof author !== "string" || author.trim().length === 0) {
    errors.push("author is required");
  }

  return errors;
}
